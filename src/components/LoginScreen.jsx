import React, { useState } from 'react';
import { Heart, Lock, UserPlus } from 'lucide-react';

const LoginScreen = ({ onLogin }) => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');

  const handlePinChange = (value, isConfirm = false) => {
    if (value.length <= 4 && /^\d*$/.test(value)) {
      if (isConfirm) {
        setConfirmPin(value);
      } else {
        setPin(value);
      }
      setError('');
    }
  };

  const handleLogin = () => {
    if (pin.length !== 4) {
      setError('PIN must be 4 digits');
      return;
    }

    if (isNewUser) {
      if (confirmPin !== pin) {
        setError('PINs do not match');
        return;
      }
      
      // Save new user
      const userData = {
        pin,
        points: 0,
        streak: 0,
        lastMoodLog: null,
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem(`user_${pin}`, JSON.stringify(userData));
      onLogin(userData);
    } else {
      // Check existing user
      const userData = localStorage.getItem(`user_${pin}`);
      if (userData) {
        onLogin(JSON.parse(userData));
      } else {
        setError('Invalid PIN. Try again or create a new account.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Heart className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Mental Health Companion</h1>
          <p className="text-gray-600">Your personal wellness assistant</p>
        </div>

        <div className="space-y-6">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => {
                setIsNewUser(false);
                setPin('');
                setConfirmPin('');
                setError('');
              }}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                !isNewUser ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
              }`}
            >
              <Lock className="h-4 w-4" />
              <span>Login</span>
            </button>
            <button
              onClick={() => {
                setIsNewUser(true);
                setPin('');
                setConfirmPin('');
                setError('');
              }}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                isNewUser ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
              }`}
            >
              <UserPlus className="h-4 w-4" />
              <span>New User</span>
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isNewUser ? 'Create 4-digit PIN' : 'Enter your 4-digit PIN'}
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => handlePinChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest"
              placeholder="••••"
              maxLength="4"
            />
          </div>

          {isNewUser && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm PIN
              </label>
              <input
                type="password"
                value={confirmPin}
                onChange={(e) => handlePinChange(e.target.value, true)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest"
                placeholder="••••"
                maxLength="4"
              />
            </div>
          )}

          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={pin.length !== 4 || (isNewUser && confirmPin.length !== 4)}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isNewUser ? 'Create Account' : 'Login'}
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Your PIN is private and stored securely on this device.</p>
          <p>Remember your PIN to access your account.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;