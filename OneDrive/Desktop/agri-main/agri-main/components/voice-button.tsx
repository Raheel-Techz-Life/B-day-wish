'use client';

import { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function VoiceButton() {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceClick = () => {
    setIsListening(!isListening);
    // Voice recognition logic would go here
  };

  return (
    <Button
      onClick={handleVoiceClick}
      variant={isListening ? 'destructive' : 'default'}
      size="sm"
      className="gap-2"
    >
      {isListening ? (
        <>
          <MicOff className="w-4 h-4" />
          Stop
        </>
      ) : (
        <>
          <Mic className="w-4 h-4" />
          Voice
        </>
      )}
    </Button>
  );
}
