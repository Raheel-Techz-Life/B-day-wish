'use client';

import { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FloatingVoiceButton() {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceClick = () => {
    setIsListening(!isListening);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Button
        onClick={handleVoiceClick}
        variant={isListening ? 'destructive' : 'default'}
        size="lg"
        className="rounded-full h-14 w-14 p-0 flex items-center justify-center"
      >
        {isListening ? (
          <MicOff className="w-6 h-6" />
        ) : (
          <Mic className="w-6 h-6" />
        )}
      </Button>
    </div>
  );
}
