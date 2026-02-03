const processMessage = async (req, res) => {
  try {
    const { message, language = 'en' } = req.body;

    // Mock AI Response Logic
    // In a real implementation, this would call OpenAI/Gemini API
    
    let responseText = '';
    
    const lowerMsg = message.toLowerCase();

    if (language === 'ar') {
      if (lowerMsg.includes('مرحبا') || lowerMsg.includes('اهلين')) {
        responseText = 'مرحباً بك في نظام سليم لإدارة الفنادق. كيف يمكنني مساعدتك اليوم؟';
      } else if (lowerMsg.includes('حجز') || lowerMsg.includes('booking')) {
        responseText = 'يمكنك إدارة الحجوزات من لوحة التحكم الرئيسية. هل ترغب في معرفة المزيد عن كيفية إنشاء حجز جديد؟';
      } else if (lowerMsg.includes('سعر') || lowerMsg.includes('price')) {
        responseText = 'يمكنك تحديد أسعار الغرف من إعدادات الغرف في لوحة التحكم.';
      } else {
        responseText = 'عذراً، أنا مساعد ذكي تحت التطوير. هل يمكنك إعادة صياغة سؤالك؟';
      }
    } else {
      // English Responses
      if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
        responseText = 'Welcome to Saleem Hotel Management System. How can I assist you today?';
      } else if (lowerMsg.includes('booking')) {
        responseText = 'You can manage bookings from the main dashboard. Would you like to know how to create a new booking?';
      } else if (lowerMsg.includes('price') || lowerMsg.includes('rate')) {
        responseText = 'You can set room rates from the Room Settings in the dashboard.';
      } else {
        responseText = 'I am an AI assistant in training. Could you please rephrase your question?';
      }
    }

    res.json({
      response: responseText,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('Chat Error:', error);
    res.status(500).json({ message: 'Error processing your message' });
  }
};

module.exports = {
  processMessage
};
