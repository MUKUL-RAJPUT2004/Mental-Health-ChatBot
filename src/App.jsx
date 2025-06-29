import React, { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import ChatInterface from './components/ChatInterface';
import MoodTracker from './components/MoodTracker';
import { Heart, MessageCircle, BarChart3 } from 'lucide-react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('chat');

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setActiveTab('chat');
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b border-blue-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-blue-800">Mental Health Companion</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-blue-600">
              <span className="font-semibold">{currentUser?.points || 0}</span> points
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-blue-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === 'chat'
                  ? 'bg-blue-600 text-white'
                  : 'text-blue-600 hover:bg-blue-50'
              }`}
            >
              <MessageCircle className="h-4 w-4" />
              <span>Chat</span>
            </button>
            <button
              onClick={() => setActiveTab('mood')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium rounded-t-lg transition-colors ${
                activeTab === 'mood'
                  ? 'bg-blue-600 text-white'
                  : 'text-blue-600 hover:bg-blue-50'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Mood Tracker</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-4">
        {activeTab === 'chat' && <ChatInterface currentUser={currentUser} />}
        {activeTab === 'mood' && <MoodTracker currentUser={currentUser} />}
      </main>
    </div>
  );
}

export default App;