# Mental Health Companion 🤖💙

A compassionate mental health chatbot designed specifically for Indian rural youth, providing emotional support, mood tracking, and wellness guidance in multiple languages.

![Mental Health Companion](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.2-purple)
![PWA](https://img.shields.io/badge/PWA-Ready-orange)

## 🌟 Features

### 💬 Intelligent Chat Interface
- **Multi-language Support**: English, Hindi, and Tamil
- **Emotion Recognition**: Detects stress, sadness, anxiety, anger, and happiness
- **Contextual Responses**: Provides personalized wellness tips based on emotional state
- **Conversation Memory**: Remembers chat history for continuity

### 📊 Mood Tracking System
- **Daily Mood Logging**: Track your emotional well-being daily
- **Progress Visualization**: View your mood patterns over time
- **Streak Tracking**: Build consistency with daily mood logging
- **Points System**: Earn points for maintaining mental health awareness

### 🔐 Secure & Private
- **PIN-based Authentication**: Simple 4-digit PIN for account access
- **Local Storage**: All data stored securely on your device
- **No Cloud Dependencies**: Complete privacy with offline functionality
- **PWA Ready**: Install as a mobile app for easy access

### 🎯 Wellness Features
- **Personalized Tips**: Context-aware mental health advice
- **Breathing Exercises**: Guided relaxation techniques
- **Gratitude Prompts**: Encourages positive thinking
- **Community Support**: References to real mental health resources

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MUKUL-RAJPUT2004/Hental-Health-ChatBot.git
   cd Hental-Health-ChatBot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## 📱 PWA Installation

The app is designed as a Progressive Web App (PWA) and can be installed on mobile devices:

1. Open the app in your mobile browser
2. Look for the "Add to Home Screen" option
3. Follow the prompts to install
4. Access the app like a native mobile application

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.2
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **PWA**: Vite PWA Plugin
- **Language Support**: Multi-language chatbot responses

## 🏗️ Project Structure

```
Mental-bot/
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── pwa-192x192.png        # PWA icons
│   └── pwa-512x512.png
├── src/
│   ├── components/
│   │   ├── ChatInterface.jsx  # Main chat component
│   │   ├── LoginScreen.jsx    # Authentication screen
│   │   └── MoodTracker.jsx    # Mood tracking interface
│   ├── App.jsx               # Main application component
│   ├── main.jsx              # Application entry point
│   └── index.css             # Global styles
├── package.json
├── vite.config.js            # Vite configuration
└── tailwind.config.js        # Tailwind CSS configuration
```

## 🎨 Key Components

### ChatInterface.jsx
- Handles real-time conversations with the chatbot
- Implements emotion detection and response generation
- Supports multiple languages (English, Hindi, Tamil)
- Manages conversation history and user interactions

### MoodTracker.jsx
- Daily mood logging with visual feedback
- Progress tracking and statistics
- Streak calculation and motivational messages
- Points system for engagement

### LoginScreen.jsx
- Simple PIN-based authentication
- New user registration
- Secure local storage management
- User data persistence

## 🌍 Multi-Language Support

The chatbot supports three languages with culturally appropriate responses:

- **English**: Primary language with comprehensive wellness tips
- **Hindi**: हिंदी में मानसिक स्वास्थ्य सहायता
- **Tamil**: தமிழில் மனநல ஆதரவு

## 🔒 Privacy & Security

- **Local Data Storage**: All user data is stored locally on the device
- **No External APIs**: No data is sent to external servers
- **PIN Protection**: Simple but effective authentication
- **Offline Functionality**: Works completely offline after initial load

## 🎯 Target Audience

This application is specifically designed for:
- **Indian Rural Youth**: Addressing unique cultural and social challenges
- **Mental Health Awareness**: Promoting emotional well-being
- **Accessibility**: Simple interface for users with limited digital literacy
- **Privacy-Conscious Users**: Those who prefer local data storage

## 🤝 Contributing

We welcome contributions to improve the Mental Health Companion:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow React best practices
- Maintain accessibility standards
- Add appropriate error handling
- Test across different devices and browsers
- Consider cultural sensitivity in content


## 🙏 Acknowledgments

- **Developer**: Mukul Rajput - For creating this compassionate mental health tool
- **Mental Health Community**: For insights and guidance
- **Open Source Community**: For the amazing tools and libraries used
- **Users**: For feedback and suggestions that help improve the application

## 📞 Support

If you need help or have questions:

- **Technical Issues**: Open an issue on GitHub
- **Feature Requests**: Submit a feature request
- **Mental Health Support**: Please contact professional mental health services

## ⚠️ Important Notice

This application is designed to provide emotional support and mental health awareness. It is **not a substitute for professional mental health care**. If you're experiencing severe mental health issues, please:

- Contact a mental health professional
- Call a crisis helpline
- Reach out to trusted friends or family
- Seek immediate medical attention if needed

## 🔄 Version History

- **v1.0.0**: Initial release with core chat and mood tracking features
- Multi-language support (English, Hindi, Tamil)
- PWA functionality
- Local data storage
- PIN-based authentication

---

**Made with ❤️ for better mental health awareness**

*Remember: You're not alone, and it's okay to ask for help.*
