'use client';

import { motion } from 'framer-motion';
import { Send, Loader, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { VoiceButton } from '@/components/voice-button';
import { DashboardCard } from '@/components/dashboard-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SUGGESTED_QUESTIONS, LANGUAGES } from '@/lib/constants';
import { ChatMessage } from '@/lib/types';
import { useLanguage } from '@/components/language-provider';
import { t } from '@/lib/translations';

const formatTime = (date: Date) => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function AssistantPage() {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'assistant',
      text: 'नमस्ते! मैं भूमि बाई हूँ, आपका कृषि सहायक। आप मुझसे कोई भी सवाल पूछ सकते हैं। (Hello! I am Bhumi Bai, your agricultural assistant. You can ask me any farming question.)',
      timestamp: new Date(),
      isVoice: false,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date(),
      isVoice: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses: { [key: string]: string } = {
        'weather': 'बारिश की संभावना है। अपने सिंचाई का समय बदलने की सलाह दी जाती है। (Rain is expected. Please adjust your irrigation timing.)',
        'price': 'वर्तमान में गेहूं की कीमत अच्छी है। अगले सप्ताह और बेहतर कीमत की उम्मीद है। (Wheat prices are good now. Better prices expected next week.)',
        'pest': 'गेहूं में शूट फ्लाई की समस्या दिखाई दे रही है। तुरंत उपचार की सलाह दी जाती है। (Shoot fly detected in wheat. Immediate treatment recommended.)',
        'default': 'धन्यवाद आपके सवाल के लिए। आप किस फसल के बारे में जानना चाहते हैं? (Thank you for your question. Which crop would you like to know about?)',
      };

      let response = responses.default;
      const lowerInput = input.toLowerCase();

      if (lowerInput.includes('weather') || lowerInput.includes('rain') || lowerInput.includes('बारिश')) {
        response = responses.weather;
      } else if (lowerInput.includes('price') || lowerInput.includes('market') || lowerInput.includes('कीमत')) {
        response = responses.price;
      } else if (lowerInput.includes('pest') || lowerInput.includes('disease') || lowerInput.includes('कीट')) {
        response = responses.pest;
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: response,
        timestamp: new Date(),
        isVoice: false,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 800);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-primary" />Bhumi Bai - Your AI Assistant</h1>
          <p className="text-muted-foreground mt-1">Voice-first Multilingual Agricultural Expert</p>
        </div>

        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {LANGUAGES.find((l) => l.code === selectedLanguage)?.label || LANGUAGES[0].label}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {LANGUAGES.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className="cursor-pointer"
              >
                {lang.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>

      {/* Chat Area */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <DashboardCard title="Chat with Bhumi Bai" className="h-[500px] flex flex-col p-0">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary/20 text-primary border border-primary rounded-br-none'
                      : 'bg-muted/50 text-foreground border border-muted rounded-bl-none'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">{formatTime(message.timestamp)}</span>
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-muted/50 text-foreground border border-muted px-4 py-2 rounded-lg rounded-bl-none flex items-center gap-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Bhumi Bai is thinking...</span>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-6 space-y-4">
            {/* Suggested Questions - Show only if chat is short */}
            {messages.length <= 2 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Suggested Questions</p>
                <div className="space-y-2">
                  {SUGGESTED_QUESTIONS.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="w-full text-left text-xs p-2 rounded bg-muted/30 border border-muted/50 hover:bg-muted/50 hover:border-muted transition text-foreground"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Controls */}
            <div className="flex gap-2 items-end">
              <VoiceButton />
              <Input
                placeholder="Ask a farming question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DashboardCard>
      </motion.div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <DashboardCard title="About Bhumi Bai">
            <div className="space-y-3 text-sm text-foreground">
              <p>Bhumi Bai is your AI-powered agricultural assistant available 24/7</p>
              <p>Ask me about crop health, pest management, irrigation, fertilizers, and market insights</p>
              <p>Available in Hindi, Telugu, Tamil, Kannada, and Marathi for better accessibility</p>
            </div>
          </DashboardCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <DashboardCard title="How to Get the Best Results">
            <div className="space-y-3 text-sm text-foreground">
              <div className="flex gap-2">
                <span className="font-bold text-primary">1.</span>
                <p>Be specific: Mention your crop, location, and current farm conditions</p>
              </div>
              <div className="flex gap-2">
                <span className="font-bold text-primary">2.</span>
                <p>Use voice: Try voice input for faster, hands-free interaction</p>
              </div>
              <div className="flex gap-2">
                <span className="font-bold text-primary">3.</span>
                <p>Share data: Provide soil, weather, or pest information for better recommendations</p>
              </div>
            </div>
          </DashboardCard>
        </motion.div>
      </div>

      {/* Quick Commands */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <DashboardCard title="Quick Commands">
          <div className="grid md:grid-cols-3 gap-3">
            {[
              { cmd: 'मौसम कैसा है?', label: 'Check Weather' },
              { cmd: 'गेहूं की कीमत बताएं', label: 'Market Prices' },
              { cmd: 'खरपतवार नियंत्रण की सलाह', label: 'Weed Control' },
              { cmd: 'सिंचाई का समय बताएं', label: 'Irrigation Schedule' },
              { cmd: 'कीट प्रबंधन', label: 'Pest Management' },
              { cmd: 'मिट्टी की परीक्षा', label: 'Soil Health' },
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestion(item.cmd)}
                className="p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition text-sm text-foreground"
              >
                {item.label}
                <p className="text-xs text-muted-foreground mt-1">{item.cmd}</p>
              </button>
            ))}
          </div>
        </DashboardCard>
      </motion.div>
    </div>
  );
}
