import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Mock user data for demo
  const mockUsers: { [key: string]: User } = {
    'john.doe@campus.edu': {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@campus.edu',
      role: 'student',
      department: 'Computer Science',
      studentId: 'ST2024001',
      phone: '+91 9876543210',
      address: '123 Campus Road, University City',
      joinDate: new Date('2023-08-15'),
      status: 'active'
    },
    'sarah.wilson@campus.edu': {
      id: '2',
      name: 'Dr. Sarah Wilson',
      email: 'sarah.wilson@campus.edu',
      role: 'teacher',
      employeeId: 'EMP001',
      department: 'Computer Science',
      phone: '+91 9876543211',
      joinDate: new Date('2020-06-01'),
      status: 'active'
    },
    'mike.johnson@campus.edu': {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@campus.edu',
      role: 'staff',
      employeeId: 'EMP002',
      department: 'Administration',
      phone: '+91 9876543212',
      joinDate: new Date('2021-03-15'),
      status: 'active'
    },
    'mary.smith@campus.edu': {
      id: '4',
      name: 'Mary Smith',
      email: 'mary.smith@campus.edu',
      role: 'parent',
      childId: 'ST2024001',
      phone: '+91 9876543213',
      status: 'active'
    },
    'robert.chen@campus.edu': {
      id: '5',
      name: 'Dr. Robert Chen',
      email: 'robert.chen@campus.edu',
      role: 'admin',
      employeeId: 'ADM001',
      department: 'Administration',
      phone: '+91 9876543214',
      joinDate: new Date('2019-01-10'),
      status: 'active'
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simple demo authentication
      if (password === 'demo123456' && mockUsers[email]) {
        setUser(mockUsers[email]);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (undefined === context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};