import React, { useState, useEffect } from 'react';
import { Smile, Frown, Meh, Zap, Calendar, Trophy, Target } from 'lucide-react';

const MoodTracker = ({ currentUser }) => {
  const [todayMood, setTodayMood] = useState(null);
  const [moodHistory, setMoodHistory] = useState([]);
  const [userStats, setUserStats] = useState({
    points: 0,
    streak: 0,
    lastMoodLog: null
  });

  const moods = [
    { id: 'happy', name: 'Happy', icon: Smile, color: 'bg-green-500', textColor: 'text-green-600' },
    { id: 'okay', name: 'Okay', icon: Meh, color: 'bg-yellow-500', textColor: 'text-yellow-600' },
    { id: 'sad', name: 'Sad', icon: Frown, color: 'bg-blue-500', textColor: 'text-blue-600' },
    { id: 'stressed', name: 'Stressed', icon: Zap, color: 'bg-red-500', textColor: 'text-red-600' },
  ];

  useEffect(() => {
    loadMoodData();
  }, [currentUser.pin]);

  const loadMoodData = () => {
    const history = localStorage.getItem(`mood_${currentUser.pin}`);
    const stats = localStorage.getItem(`user_${currentUser.pin}`);
    
    if (history) {
      const parsedHistory = JSON.parse(history);
      setMoodHistory(parsedHistory);
      
      // Check if user logged today
      const today = new Date().toDateString();
      const todayLog = parsedHistory.find(log => new Date(log.date).toDateString() === today);
      if (todayLog) {
        setTodayMood(todayLog.mood);
      }
    }
    
    if (stats) {
      const parsedStats = JSON.parse(stats);
      setUserStats(parsedStats);
    }
  };

  const logMood = (moodId) => {
    const today = new Date().toDateString();
    const todayLog = moodHistory.find(log => new Date(log.date).toDateString() === today);
    
    if (todayLog) {
      // Update existing log
      const updatedHistory = moodHistory.map(log => 
        new Date(log.date).toDateString() === today 
          ? { ...log, mood: moodId }
          : log
      );
      setMoodHistory(updatedHistory);
      localStorage.setItem(`mood_${currentUser.pin}`, JSON.stringify(updatedHistory));
    } else {
      // Add new log
      const newLog = {
        date: new Date().toISOString(),
        mood: moodId
      };
      const updatedHistory = [...moodHistory, newLog];
      setMoodHistory(updatedHistory);
      localStorage.setItem(`mood_${currentUser.pin}`, JSON.stringify(updatedHistory));
      
      // Update points and streak
      const newPoints = userStats.points + 10;
      const newStreak = calculateNewStreak();
      const updatedStats = {
        ...userStats,
        points: newPoints,
        streak: newStreak,
        lastMoodLog: new Date().toISOString()
      };
      
      setUserStats(updatedStats);
      localStorage.setItem(`user_${currentUser.pin}`, JSON.stringify(updatedStats));
      localStorage.setItem('currentUser', JSON.stringify(updatedStats));
    }
    
    setTodayMood(moodId);
  };

  const calculateNewStreak = () => {
    const today = new Date();
    const sortedHistory = [...moodHistory].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    let streak = 1; // Today's log
    let currentDate = new Date(today);
    currentDate.setDate(currentDate.getDate() - 1);
    
    for (const log of sortedHistory) {
      const logDate = new Date(log.date);
      if (logDate.toDateString() === currentDate.toDateString()) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    
    return streak;
  };

  const getStreakMessage = () => {
    if (userStats.streak === 0) return "Start your streak today!";
    if (userStats.streak === 1) return "Great start!";
    if (userStats.streak < 7) return `${userStats.streak} days strong!`;
    if (userStats.streak < 30) return `Amazing ${userStats.streak} day streak!`;
    return `Incredible ${userStats.streak} day streak! 🌟`;
  };

  const getRecentMoods = () => {
    return moodHistory
      .slice(-7)
      .reverse()
      .map(log => ({
        ...log,
        mood: moods.find(m => m.id === log.mood)
      }));
  };

  return (
    <div className="space-y-6">
      {/* Today's Mood */}
      <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          How are you feeling today?
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {moods.map((mood) => {
            const Icon = mood.icon;
            const isSelected = todayMood === mood.id;
            
            return (
              <button
                key={mood.id}
                onClick={() => logMood(mood.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  isSelected
                    ? `${mood.color} text-white border-transparent transform scale-105`
                    : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <Icon className={`h-8 w-8 mx-auto mb-2 ${isSelected ? 'text-white' : mood.textColor}`} />
                <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                  {mood.name}
                </span>
              </button>
            );
          })}
        </div>
        
        {todayMood && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-green-800 text-sm font-medium">
              ✓ Mood logged for today! You earned 10 points.
            </p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
            <Trophy className="h-5 w-5 mr-2" />
            Your Progress
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Current Streak</span>
              <span className="font-bold text-blue-600">{userStats.streak} days</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Points</span>
              <span className="font-bold text-green-600">{userStats.points}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Moods Logged</span>
              <span className="font-bold text-purple-600">{moodHistory.length}</span>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm font-medium">
              {getStreakMessage()}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Recent Moods
          </h3>
          
          <div className="space-y-3">
            {getRecentMoods().length > 0 ? (
              getRecentMoods().map((log, index) => {
                const Icon = log.mood.icon;
                return (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3">
                      <Icon className={`h-5 w-5 ${log.mood.textColor}`} />
                      <span className="text-sm font-medium">{log.mood.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(log.date).toLocaleDateString()}
                    </span>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-sm">No mood logs yet. Start by logging your mood today!</p>
            )}
          </div>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-2">Keep Going! 💪</h3>
        <p className="text-blue-100">
          Every day you log your mood is a step towards better mental health awareness. 
          You're doing great by taking care of yourself!
        </p>
      </div>
    </div>
  );
};

export default MoodTracker;