import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { GraduationCap, Lock, Mail, AlertCircle, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [setupLoading, setSetupLoading] = useState(false);
  const { login } = useAuth();

  const setupDemoUsers = async () => {
    setSetupLoading(true);
    setError('');
    
    // Check if Supabase is properly configured
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey || 
        supabaseUrl === 'https://your-project.supabase.co' || 
        supabaseAnonKey === 'your-anon-key') {
      setError('❌ Supabase is not configured. Please set up your Supabase project first. Check the README.md for instructions.');
      setSetupLoading(false);
      return;
    }
    
    const demoUsers = [
      {
        email: 'john.doe@campus.edu',
        password: 'demo123456',
        name: 'John Doe',
        role: 'student',
        studentId: 'ST2024001',
        department: 'Computer Science'
      },
      {
        email: 'sarah.wilson@campus.edu',
        password: 'demo123456',
        name: 'Dr. Sarah Wilson',
        role: 'teacher',
        employeeId: 'EMP001',
        department: 'Computer Science'
      },
      {
        email: 'mike.johnson@campus.edu',
        password: 'demo123456',
        name: 'Mike Johnson',
        role: 'staff',
        employeeId: 'EMP002',
        department: 'Administration'
      },
      {
        email: 'mary.smith@campus.edu',
        password: 'demo123456',
        name: 'Mary Smith',
        role: 'parent',
        childId: 'ST2024001'
      },
      {
        email: 'robert.chen@campus.edu',
        password: 'demo123456',
        name: 'Dr. Robert Chen',
        role: 'admin',
        employeeId: 'ADM001',
        department: 'Administration'
      }
    ];

    try {
      for (const user of demoUsers) {
        // Create auth user
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email: user.email,
          password: user.password,
          email_confirm: true, // Auto-confirm email
          options: {
            data: {
              name: user.name,
              role: user.role
            }
          }
        });

        if (authError && !authError.message.includes('already registered') && !authError.message.includes('User already registered')) {
          console.error(`Error creating auth user ${user.email}:`, authError);
          // Try regular signup if admin creation fails
          const { data: signupData, error: signupError } = await supabase.auth.signUp({
            email: user.email,
            password: user.password,
            options: {
              data: {
                name: user.name,
                role: user.role
              }
            }
          });
          
          if (signupError && !signupError.message.includes('already registered')) {
            console.error(`Error with signup for ${user.email}:`, signupError);
            continue;
          }
        }

        // If user was created or already exists, ensure profile exists
        if (authData?.user || authError?.message.includes('already registered') || authError?.message.includes('User already registered')) {
          // Get the user ID (either from new user or existing user)
          let userId = authData?.user?.id;
          
          if (!userId && (authError?.message.includes('already registered') || authError?.message.includes('User already registered'))) {
            // Try to sign in to get the user ID
            const { data: signInData } = await supabase.auth.signInWithPassword({
              email: user.email,
              password: user.password
            });
            userId = signInData.user?.id;
            await supabase.auth.signOut(); // Sign out immediately
          }

          if (userId) {
            // Check if profile already exists
            const { data: existingProfile } = await supabase
              .from('users')
              .select('id')
              .eq('id', userId)
              .single();

            if (!existingProfile) {
              // Create user profile
              const { error: profileError } = await supabase
                .from('users')
                .insert({
                  id: userId,
                  email: user.email,
                  name: user.name,
                  role: user.role,
                  department: user.department || null,
                  student_id: user.studentId || null,
                  employee_id: user.employeeId || null,
                  child_id: user.childId || null,
                  phone: '+91 9876543210',
                  address: '123 Campus Road, University City',
                  status: 'active'
                });

              if (profileError) {
                console.error(`Error creating profile for ${user.email}:`, profileError);
              }
            }
          }
        }
      }
      
      setError('✅ Demo users setup complete! You can now login with any demo account using password: demo123456');
    } catch (err) {
      console.error('Setup error:', err);
      setError('❌ Error setting up demo users. Please ensure your Supabase project is properly configured and the database schema has been applied.');
    } finally {
      setSetupLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Check if Supabase is properly configured
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey || 
        supabaseUrl === 'https://your-project.supabase.co' || 
        supabaseAnonKey === 'your-anon-key') {
      setError('❌ Supabase is not configured. Please set up your Supabase project first. Check the README.md for instructions.');
      setLoading(false);
      return;
    }

    try {
      const success = await login(email, password);
      if (!success) {
        setError('❌ Invalid email or password. If this is your first time, please setup demo users first.');
      }
    } catch (err) {
      setError('❌ Login failed. Please ensure your Supabase project is configured and demo users are set up.');
    } finally {
      setLoading(false);
    }
  };

  const demoCredentials = [
    { role: 'Student', email: 'john.doe@campus.edu', password: 'demo123456' },
    { role: 'Teacher', email: 'sarah.wilson@campus.edu', password: 'demo123456' },
    { role: 'Staff', email: 'mike.johnson@campus.edu', password: 'demo123456' },
    { role: 'Parent', email: 'mary.smith@campus.edu', password: 'demo123456' },
    { role: 'Admin', email: 'robert.chen@campus.edu', password: 'demo123456' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-blue-600 p-3 rounded-full">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Campus Sphere</h2>
          <p className="mt-2 text-sm text-gray-600">
            Your centralized college management platform
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Campus Email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.email@campus.edu"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-4">
            <button
              type="button"
              onClick={setupDemoUsers}
              disabled={setupLoading}
              className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Users className="h-4 w-4 mr-2" />
              {setupLoading ? 'Setting up demo users...' : 'Setup Demo Users (First Time Only)'}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-800 font-medium mb-2">📋 Setup Instructions:</p>
              <ol className="text-xs text-blue-700 space-y-1">
                <li>1. Create a Supabase project at supabase.com</li>
                <li>2. Update .env.local with your project URL and API key</li>
                <li>3. Run the database migration in Supabase SQL Editor</li>
                <li>4. Click "Setup Demo Users" button below</li>
                <li>5. Login with demo credentials</li>
              </ol>
            </div>
            <p className="text-xs text-gray-500 text-center mb-3">
              Demo Credentials (Password: demo123456):
            </p>
            <div className="space-y-1">
              {demoCredentials.map((cred, index) => (
                <div key={index} className="flex justify-between text-xs text-gray-600">
                  <span className="font-medium">{cred.role}:</span>
                  <span className="font-mono">{cred.email}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;