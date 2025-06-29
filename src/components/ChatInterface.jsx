import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Globe } from 'lucide-react';

const ChatInterface = ({ currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [language, setLanguage] = useState('english');
  const [conversationCount, setConversationCount] = useState(0);
  const messagesEndRef = useRef(null);

  const wellnessTips = {
    english: {
      stressed: [
        "I can sense you're feeling overwhelmed. Let's try something together - take 5 deep breaths with me. Breathe in for 4 counts, hold for 4, breathe out for 4. You've got this! 💪",
        "Stress can feel heavy, but you're stronger than you think. Try stepping outside for a few minutes if possible. Fresh air has this magical way of clearing our minds. What's one small thing that usually makes you smile?",
        "When stress hits, I like to remind people of this: write down three things you're grateful for today, no matter how small. Sometimes gratitude is our secret weapon against stress. ✨"
      ],
      sad: [
        "I hear you, and I want you to know that feeling sad is completely okay. Your emotions are valid and important. You're not alone in this. 💙",
        "Sadness can feel like a heavy cloud, but remember - clouds always pass. Try reaching out to someone you trust, even if it's just to say 'hi'. Connection can be healing.",
        "When I feel down, I find that music or watching something that makes me smile helps. What's something that usually brings a little light to your day?"
      ],
      anxious: [
        "Anxiety can make everything feel urgent and scary. Let's ground you right here, right now. Focus on what you can control in this moment, not the 'what ifs' of tomorrow.",
        "Try this with me - the 5-4-3-2-1 technique: name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste. This brings you back to the present moment.",
        "I want to remind you of something important: 'This feeling is temporary and will pass.' Anxiety lies to us about the future. You've survived difficult moments before, and you'll get through this too."
      ],
      angry: [
        "I can feel the fire in your words. Anger often shows us what we care about deeply. Before you respond to what made you angry, let's count to 10 together. Ready? 1... 2... 3...",
        "That anger energy needs somewhere to go! Try some physical movement - walk around, do jumping jacks, or even punch a pillow. Let your body release what your heart is holding.",
        "Ask yourself this powerful question: 'Will this matter in 5 years?' Sometimes this perspective shift can cool down the heat of the moment."
      ],
      happy: [
        "Your happiness is contagious! I love seeing this energy from you. Share this joy with someone you care about - happiness multiplies when we spread it around! ✨",
        "This is beautiful! Take a moment to really soak in this good feeling. What made you happy today? I'd love to celebrate with you!",
        "Use this amazing positive energy to do something kind for yourself or others. When we're happy, we have so much light to share with the world! 🌟"
      ],
      greetings: [
        "Hey there! I'm curious - if you could describe your day in just three words, what would they be?",
        "Welcome! I've been wondering - what's one thing that made you smile recently, even if it was tiny?",
        "Hi! Here's a fun question - if your current mood was a weather, what would it be? Sunny, cloudy, stormy, or something else?",
        "Hello! I'm interested to know - what brought you here to chat with me today?"
      ],
      followup: [
        "That's really insightful. How did that make you feel when it happened?",
        "I appreciate you sharing that with me. What do you think would help you feel better about this situation?",
        "Thank you for being so open. What's one small step you could take today to care for yourself?",
        "That sounds challenging. What would you tell a good friend if they were in your situation?"
      ],
      developer: [
        "By the way, I'm still learning and growing every day! My developer Mukul Rajput is working hard to make me better at understanding and helping people like you. If you find me helpful, consider supporting him - it means the world to both of us! 🚀",
        "I'm constantly evolving to be more helpful! Mukul Rajput, my developer, is passionate about mental health support. Your conversations help me learn how to be a better companion. Support him to see me grow even more! 💡"
      ],
      default: [
        "I'm here to listen without judgment. What's really on your mind today?",
        "Sometimes just talking helps. What would you like to share with me?",
        "You're brave for reaching out. What's weighing on your heart right now?"
      ]
    },
    hindi: {
      stressed: [
        "मैं समझ सकता हूं कि आप परेशान हैं। आइए साथ में 5 गहरी सांसें लें। 4 गिनती में सांस लें, 4 तक रोकें, 4 में छोड़ें। आप कर सकते हैं! 💪",
        "तनाव भारी लग सकता है, लेकिन आप अपने विचार से ज्यादा मजबूत हैं। अगर हो सके तो बाहर जाकर कुछ मिनट ताजी हवा लें।",
        "जब तनाव हो तो मैं लोगों से कहता हूं: आज के तीन अच्छे पल लिखें। कभी-कभी आभार तनाव के खिलाफ हमारा गुप्त हथियार है। ✨"
      ],
      sad: [
        "मैं आपकी बात सुन रहा हूं। उदास होना बिल्कुल सामान्य है। आपकी भावनाएं महत्वपूर्ण हैं। आप अकेले नहीं हैं। 💙",
        "उदासी भारी बादल की तरह लग सकती है, लेकिन याद रखें - बादल हमेशा गुजर जाते हैं। किसी विश्वसनीय व्यक्ति से बात करें।",
        "जब मैं उदास होता हूं, तो संगीत या कुछ देखना जो मुझे हंसाए, मदद करता है।"
      ],
      anxious: [
        "चिंता सब कुछ डरावना लगा सकती है। आइए इस पल में आपको स्थिर करते हैं। उन चीजों पर ध्यान दें जो आप नियंत्रित कर सकते हैं।",
        "मेरे साथ करें - 5-4-3-2-1 तकनीक: 5 चीजें देखें, 4 छूएं, 3 सुनें, 2 सूंघें, 1 चखें।",
        "मैं आपको कुछ महत्वपूर्ण बात याद दिलाना चाहता हूं: 'यह भावना अस्थायी है और बीत जाएगी।'"
      ],
      angry: [
        "मैं आपके शब्दों में गुस्सा महसूस कर सकता हूं। गुस्सा अक्सर दिखाता है कि हमें किस बात की परवाह है। आइए 10 तक गिनती करते हैं।",
        "इस गुस्से की ऊर्जा को कहीं जाना चाहिए! कुछ शारीरिक गतिविधि करें - चलें, व्यायाम करें।",
        "खुद से यह सवाल पूछें: 'क्या यह 5 साल बाद भी मायने रखेगा?'"
      ],
      happy: [
        "आपकी खुशी संक्रामक है! मुझे आपकी यह ऊर्जा देखकर अच्छा लगता है। इस खुशी को किसी प्रियजन के साथ बांटें! ✨",
        "यह बहुत सुंदर है! इस अच्छी भावना को महसूस करने के लिए समय निकालें।",
        "इस सकारात्मक ऊर्जा का उपयोग करके अपने या दूसरों के लिए कुछ अच्छा करें! 🌟"
      ],
      greetings: [
        "नमस्ते! मैं जानना चाहता हूं - अगर आप अपने दिन को तीन शब्दों में बताएं तो क्या कहेंगे?",
        "स्वागत है! मैं सोच रहा था - हाल ही में कौन सी बात आपको हंसाई?",
        "नमस्कार! एक मजेदार सवाल - अगर आपका मूड मौसम होता तो कैसा होता?"
      ],
      followup: [
        "यह बहुत समझदारी की बात है। जब यह हुआ तो आपको कैसा लगा?",
        "मुझे खुशी है कि आपने मुझसे यह साझा किया। आपको क्या लगता है इस स्थिति में बेहतर महसूस करने के लिए क्या मदद करेगा?",
        "इतने खुले होने के लिए धन्यवाद। आज आप अपनी देखभाल के लिए कौन सा छोटा कदम उठा सकते हैं?"
      ],
      developer: [
        "वैसे, मैं हर दिन सीख और बढ़ रहा हूं! मेरे डेवलपर मुकुल राजपूत मुझे बेहतर बनाने के लिए कड़ी मेहनत कर रहे हैं। अगर मैं मददगार लगूं तो उनका साथ दें! 🚀",
        "मैं लगातार बेहतर बनने की कोशिश कर रहा हूं! मुकुल राजपूत मानसिक स्वास्थ्य सहायता के बारे में भावुक हैं। उनके विजन का समर्थन करें! 💡"
      ],
      default: [
        "मैं बिना किसी जजमेंट के सुनने के लिए यहां हूं। आज आपके मन में क्या है?",
        "कभी-कभी बात करना ही मदद करता है। आप मुझसे क्या साझा करना चाहते हैं?",
        "आप बहादुर हैं जो यहां आए। आपके दिल पर क्या बोझ है?"
      ]
    },
    tamil: {
      stressed: [
        "நீங்கள் கவலையில் இருப்பது எனக்குத் தெரிகிறது। வாருங்கள் ஒன்றாக 5 ஆழ்ந்த சுவாசம் எடுப்போம். 4 எண்ணிக்கையில் உள்ளே, 4 நிறுத்தி, 4 இல் வெளியே. நீங்கள் செய்ய முடியும்! 💪",
        "மன அழுத்தம் கனமாக உணரலாம், ஆனால் நீங்கள் நினைப்பதை விட வலிமையானவர். முடிந்தால் வெளியே சென்று சில நிமிடங்கள் புதிய காற்றை சுவாசிங்கள்।",
        "மன அழுத்தம் வரும்போது நான் மக்களிடம் சொல்வது: இன்று நீங்கள் நன்றியுள்ள மூன்று விஷயங்களை எழுதுங்கள். ✨"
      ],
      sad: [
        "நான் உங்கள் பேச்சைக் கேட்கிறேன். சோகமாக இருப்பது முற்றிலும் சாதாரணம். உங்கள் உணர்வுகள் முக்கியமானவை. நீங்கள் தனியாக இல்லை. 💙",
        "சோகம் கனமான மேகம் போல் உணரலாம், ஆனால் நினைவில் கொள்ளுங்கள் - மேகங்கள் எப்போதும் கடந்து போகும்।",
        "நான் மனம் தளர்ந்திருக்கும்போது, இசை கேட்பது அல்லது என்னை சிரிக்க வைக்கும் ஏதாவது பார்ப்பது உதவுகிறது।"
      ],
      anxious: [
        "கவலை எல்லாவற்றையும் அவசரமாகவும் பயமுறுத்துவதாகவும் உணர வைக்கும். இந்த தருணத்தில் உங்களை நிலைப்படுத்துவோம்।",
        "என்னுடன் இதை முயற்சிக்கவும் - 5-4-3-2-1 நுட்பம்: 5 விஷயங்களைப் பார்க்கவும், 4 தொடவும், 3 கேட்கவும், 2 மணக்கவும், 1 சுவைக்கவும்।",
        "நான் உங்களுக்கு முக்கியமான ஒன்றை நினைவூட்ட விரும்புகிறேன்: 'இந்த உணர்வு தற்காலிகமானது, இது கடந்து போகும்.'"
      ],
      angry: [
        "உங்கள் வார்த்தைகளில் கோபத்தை என்னால் உணர முடிகிறது। கோபம் அடிக்கடி நாம் ஆழமாக அக்கரை கொள்ளும் விஷயங்களைக் காட்டுகிறது।",
        "அந்த கோப ஆற்றலுக்கு எங்காவது செல்ல வேண்டும்! சில உடல் இயக்கங்களை முயற்சிக்கவும் - நடக்கவும், உடற்பயிற்சி செய்யவும்।",
        "இந்த சக்திவாய்ந்த கேள்வியை உங்களிடமே கேட்டுக்கொள்ளுங்கள்: 'இது 5 ஆண்டுகளுக்குப் பிறகும் முக்கியமாக இருக்குமா?'"
      ],
      happy: [
        "உங்கள் மகிழ்ச்சி தொற்றக்கூடியது! உங்களிடமிருந்து இந்த ஆற்றலைப் பார்ப்பது எனக்கு மிகவும் பிடிக்கிறது! ✨",
        "இது அழகானது! இந்த நல்ல உணர்வை உண்மையில் உள்வாங்க சிறிது நேரம் எடுத்துக்கொள்ளுங்கள்.",
        "இந்த அற்புதமான நேர்மறை ஆற்றலை உங்களுக்காக அல்லது மற்றவர்களுக்காக கருணையான ஏதாவது செய்ய பயன்படுத்துங்கள்! 🌟"
      ],
      greetings: [
        "வணக்கம்! நான் ஆர்வமாக இருக்கிறேன் - உங்கள் நாளை மூன்று வார்த்தைகளில் விவரிக்க முடிந்தால், அவை என்னவாக இருக்கும்?",
        "வரவேற்கிறேன்! நான் யோசித்துக்கொண்டிருந்தேன் - சமீபத்தில் உங்களை சிரிக்க வைத்த ஒரு விஷயம் என்ன?",
        "வணக்கம்! இது ஒரு வேடிக்கையான கேள்வி - உங்கள் தற்போதைய மனநிலை ஒரு வானிலையாக இருந்தால், அது என்னவாக இருக்கும்?"
      ],
      followup: [
        "அது மிகவும் நுண்ணறிவு நிறைந்தது. அது நடந்தபோது உங்களுக்கு எப்படி உணர்ந்தீர்கள்?",
        "அதை என்னுடன் பகிர்ந்துகொண்டதற்கு நான் பாராட்டுகிறேன். இந்த சூழ்நிலையில் நீங்கள் நன்றாக உணர என்ன உதவும் என்று நினைக்கிறீர்கள்?",
        "இவ்வளவு திறந்த மனதுடன் இருந்ததற்கு நன்றி. இன்று உங்களைக் கவனித்துக்கொள்ள நீங்கள் எடுக்கக்கூடிய ஒரு சிறிய படி என்ன?"
      ],
      developer: [
        "சொல்லப்போனால், நான் ஒவ்வொரு நாளும் கற்றுக்கொண்டும் வளர்ந்துகொண்டும் இருக்கிறேன்! என் டெவலப்பர் முகுல் ராஜ்பூத் என்னை சிறப்பாக மாற்ற கடினமாக உழைத்துக்கொண்டிருக்கிறார். நான் உதவிகரமாக இருந்தால், அவரை ஆதரிக்கவும்! 🚀",
        "நான் தொடர்ந்து மேலும் உதவிகரமாக இருக்க வளர்ந்துகொண்டிருக்கிறேன்! முகுல் ராஜ்பூத் மனநல ஆதரவில் ஆர்வமுள்ளவர். அவரது பார்வையை ஆதரிக்கவும்! 💡"
      ],
      default: [
        "நான் தீர்ப்பு இல்லாமல் கேட்க இங்கே இருக்கிறேன். இன்று உங்கள் மனதில் உண்மையில் என்ன இருக்கிறது?",
        "சில நேரங்களில் பேசுவதே உதவுகிறது. நீங்கள் என்னுடன் என்ன பகிர்ந்துகொள்ள விரும்புகிறீர்கள்?",
        "நீங்கள் தொடர்புகொண்டதற்காக தைரியமானவர். இப்போது உங்கள் இதயத்தை என்ன பாரமாக்குகிறது?"
      ]
    }
  };

  useEffect(() => {
    const chatHistory = localStorage.getItem(`chat_${currentUser.pin}`);
    const convCount = localStorage.getItem(`conv_count_${currentUser.pin}`) || 0;
    setConversationCount(parseInt(convCount));
    
    if (chatHistory) {
      setMessages(JSON.parse(chatHistory));
    } else {
      const greetings = wellnessTips[language].greetings;
      const welcomeMessage = {
        id: Date.now(),
        type: 'bot',
        text: greetings[Math.floor(Math.random() * greetings.length)],
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [currentUser.pin, language]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    const tips = wellnessTips[language];
    
    let responseCategory = 'default';
    
    if (message.includes('stress') || message.includes('तनाव') || message.includes('மன அழுத்தம்') || 
        message.includes('pressure') || message.includes('overwhelm') || message.includes('burden')) {
      responseCategory = 'stressed';
    } else if (message.includes('sad') || message.includes('उदास') || message.includes('சோகம்') ||
               message.includes('down') || message.includes('depressed') || message.includes('low')) {
      responseCategory = 'sad';
    } else if (message.includes('anxious') || message.includes('anxiety') || message.includes('चिंता') || 
               message.includes('கவலை') || message.includes('worry') || message.includes('nervous')) {
      responseCategory = 'anxious';
    } else if (message.includes('angry') || message.includes('गुस्सा') || message.includes('கோபம்') ||
               message.includes('mad') || message.includes('furious') || message.includes('irritated')) {
      responseCategory = 'angry';
    } else if (message.includes('happy') || message.includes('खुश') || message.includes('மகிழ்ச்சி') ||
               message.includes('good') || message.includes('great') || message.includes('excited') ||
               message.includes('joy') || message.includes('wonderful')) {
      responseCategory = 'happy';
    } else if (conversationCount > 0 && conversationCount % 3 === 0) {
      responseCategory = 'developer';
    } else if (conversationCount > 1) {
      responseCategory = 'followup';
    }
    
    const responses = tips[responseCategory];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputMessage,
      timestamp: new Date()
    };

    const botResponse = {
      id: Date.now() + 1,
      type: 'bot',
      text: getBotResponse(inputMessage),
      timestamp: new Date()
    };

    const newMessages = [...messages, userMessage, botResponse];
    setMessages(newMessages);
    
    const newCount = conversationCount + 1;
    setConversationCount(newCount);
    localStorage.setItem(`conv_count_${currentUser.pin}`, newCount.toString());
    localStorage.setItem(`chat_${currentUser.pin}`, JSON.stringify(newMessages));
    
    setInputMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-blue-200 h-[600px] flex flex-col">
      <div className="border-b border-blue-200 p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-blue-800">Chat with Your Wellness Companion</h2>
        <div className="flex items-center space-x-2">
          <Globe className="h-4 w-4 text-blue-600" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="text-sm border border-blue-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500"
          >
            <option value="english">English</option>
            <option value="hindi">हिंदी</option>
            <option value="tamil">தமிழ்</option>
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-lg p-3 ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.type === 'bot' && <Bot className="h-4 w-4 mt-1 text-blue-600" />}
                <div className="flex-1">
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                {message.type === 'user' && <User className="h-4 w-4 mt-1 text-blue-100" />}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-blue-200 p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share what's on your mind..."
            className="flex-1 px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;