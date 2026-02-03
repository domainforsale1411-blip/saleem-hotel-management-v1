import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome to Saleem Hotel System",
      "login": "Login",
      "register": "Register",
      "registerButton": "Create Account",
      "fullName": "Full Name",
      "email": "Email Address",
      "password": "Password",
      "companyName": "Company Name",
      "phone": "Phone Number",
      "whatsapp": "WhatsApp Number",
      "dashboardWelcome": "Welcome to Dashboard",
      "myHotels": "My Hotels",
      "overview": "Overview",
      "hotels": "Hotels",
      "logout": "Logout",
      "saleemAssistant": "Saleem Assistant",
      "chatError": "Sorry, I encountered an error.",
      "typeMessage": "Type a message..."
    }
  },
  ar: {
    translation: {
      "welcome": "مرحباً بكم في نظام فندق سليم",
      "login": "تسجيل الدخول",
      "register": "تسجيل جديد",
      "registerButton": "إنشاء حساب",
      "fullName": "الاسم الكامل",
      "email": "البريد الإلكتروني",
      "password": "كلمة المرور",
      "companyName": "اسم الشركة",
      "phone": "رقم الهاتف",
      "whatsapp": "رقم الواتساب",
      "dashboardWelcome": "مرحباً بك في لوحة التحكم",
      "myHotels": "فنادقي",
      "overview": "نظرة عامة",
      "hotels": "الفنادق",
      "logout": "تسجيل الخروج",
      "saleemAssistant": "مساعد سليم",
      "chatError": "عذراً، حدث خطأ ما.",
      "typeMessage": "اكتب رسالة..."
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", 
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
