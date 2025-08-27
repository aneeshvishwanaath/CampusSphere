import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import App from './components/App';

function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWrapper;