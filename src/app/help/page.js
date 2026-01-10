'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function HelpSupport() {
  const router = useRouter();
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "How do I create a new ticket?",
      answer: "Go to Services, select your category, and click 'Create Ticket'. Fill in the required details and submit."
    },
    {
      id: 2,
      question: "How can I track my ticket status?",
      answer: "Visit 'My Tickets' section to view all your tickets and their current status in real-time."
    },
    {
      id: 3,
      question: "What if I forgot my password?",
      answer: "Click 'Forgot Password' on the login screen and follow the instructions sent to your email."
    },
    {
      id: 4,
      question: "How do I update my profile?",
      answer: "Go to Profile section and tap on your details to edit and update your information."
    },
    {
      id: 5,
      question: "Can I cancel a ticket?",
      answer: "Yes, you can cancel tickets that are still pending. Contact support for tickets in progress."
    }
  ];

  const supportOptions = [
    {
      id: 1,
      title: "Live Chat",
      desc: "Chat with our support team",
      icon: "💬",
      bgColor: "bg-blue-100",
      action: () => alert("Live chat feature coming soon!")
    },
    {
      id: 2,
      title: "Email Support",
      desc: "Send us an email",
      icon: "📧",
      bgColor: "bg-green-100",
      action: () => window.location.href = "mailto:support@example.com"
    },
    {
      id: 3,
      title: "Call Support",
      desc: "Speak with our team",
      icon: "📞",
      bgColor: "bg-purple-100",
      action: () => window.location.href = "tel:+1234567890"
    },
    {
      id: 4,
      title: "Report Bug",
      desc: "Found an issue? Let us know",
      icon: "🐛",
      bgColor: "bg-red-100",
      action: () => router.push('/create-ticket?type=bug')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white pb-20">
      {/* Header */}
      <div className="bg-white p-4 rounded-b-3xl shadow-sm">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button 
            onClick={() => router.back()} 
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <span className="text-lg">←</span>
          </button>
          <h1 className="text-xl font-bold text-black">Help & Support</h1>
          <div className="w-10 h-10"></div>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto space-y-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-bold text-black mb-4">Get Help</h2>
          <div className="grid grid-cols-2 gap-3">
            {supportOptions.map((option) => (
              <button
                key={option.id}
                onClick={option.action}
                className="p-3 rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className={`w-10 h-10 ${option.bgColor} rounded-full flex items-center justify-center mx-auto mb-2`}>
                  <span className="text-lg">{option.icon}</span>
                </div>
                <h3 className="font-semibold text-black text-sm">{option.title}</h3>
                <p className="text-xs text-gray-600 mt-1">{option.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-bold text-black mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqData.map((faq) => (
              <div key={faq.id} className="border border-gray-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50"
                >
                  <span className="font-medium text-black text-sm">{faq.question}</span>
                  <span className={`text-yellow-500 transition-transform ${expandedFaq === faq.id ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-4 pb-4 text-sm text-gray-600 border-t border-gray-100">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* App Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-bold text-black mb-4">App Information</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Version</span>
              <span className="font-medium text-black">1.0.0</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Last Updated</span>
              <span className="font-medium text-black">Dec 2024</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Support Hours</span>
              <span className="font-medium text-black">24/7</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-bold text-black mb-4">Quick Links</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <span className="text-lg">📋</span>
                <span className="font-medium text-black">Terms of Service</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <span className="text-lg">🔒</span>
                <span className="font-medium text-black">Privacy Policy</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <span className="text-lg">⭐</span>
                <span className="font-medium text-black">Rate Our App</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-4 border border-red-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">🚨</span>
            </div>
            <div>
              <h3 className="font-bold text-red-800">Emergency Support</h3>
              <p className="text-xs text-red-600">For urgent issues only</p>
            </div>
          </div>
          <button 
            onClick={() => window.location.href = "tel:+1234567890"}
            className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors"
          >
            Call Emergency Line
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around py-2 max-w-md mx-auto">
          <button onClick={() => router.push('/')} className="flex flex-col items-center py-2 px-4">
            <div className="w-6 h-6 flex items-center justify-center mb-1">
              <span className="text-gray-400 text-xs">🏠</span>
            </div>
            <span className="text-xs text-gray-400">Home</span>
          </button>
          <button onClick={() => router.push('/tickets')} className="flex flex-col items-center py-2 px-4">
            <div className="w-6 h-6 flex items-center justify-center mb-1">
              <span className="text-gray-400 text-xs">📋</span>
            </div>
            <span className="text-xs text-gray-400">Tickets</span>
          </button>
          <button onClick={() => router.push('/notifications')} className="flex flex-col items-center py-2 px-4">
            <div className="w-6 h-6 flex items-center justify-center mb-1">
              <span className="text-gray-400 text-xs">🔔</span>
            </div>
            <span className="text-xs text-gray-400">Alerts</span>
          </button>
          <button onClick={() => router.push('/profile')} className="flex flex-col items-center py-2 px-4">
            <div className="w-6 h-6 flex items-center justify-center mb-1">
              <span className="text-gray-400 text-xs">👤</span>
            </div>
            <span className="text-xs text-gray-400">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}