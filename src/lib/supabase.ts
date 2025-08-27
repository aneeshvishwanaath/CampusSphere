import { createClient } from '@supabase/supabase-js';

// Use placeholder values that won't cause crashes
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Simple auth helper functions that work without real Supabase
export const signUp = async (email: string, password: string, userData: any) => {
  // Return mock success for demo
  return { 
    data: { user: { id: '1', email } }, 
    error: null 
  };
};

export const signIn = async (email: string, password: string) => {
  // Mock authentication for demo users
  const demoUsers = [
    { email: 'john.doe@campus.edu', id: '1', role: 'student' },
    { email: 'sarah.wilson@campus.edu', id: '2', role: 'teacher' },
    { email: 'mike.johnson@campus.edu', id: '3', role: 'staff' },
    { email: 'mary.smith@campus.edu', id: '4', role: 'parent' },
    { email: 'robert.chen@campus.edu', id: '5', role: 'admin' }
  ];

  const user = demoUsers.find(u => u.email === email);
  
  if (user && password === 'demo123456') {
    return { 
      data: { user: { id: user.id, email: user.email } }, 
      error: null 
    };
  }
  
  return { 
    data: { user: null }, 
    error: { message: 'Invalid login credentials' } 
  };
};

export const signOut = async () => {
  return { error: null };
};

export const getCurrentUser = async () => {
  return { user: null, error: null };
};

export const getSession = async () => {
  return { session: null, error: null };
};