'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type VoiceType = 'male' | 'female';

interface VoiceContextType {
  voice: VoiceType;
  setVoice: (v: VoiceType) => void;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export function VoiceProvider({ children }: { children: ReactNode }) {
  const [voice, setVoice] = useState<VoiceType>('male');

  return (
    <VoiceContext.Provider value={{ voice, setVoice }}>
      {children}
    </VoiceContext.Provider>
  );
}

export function useVoice() {
  const context = useContext(VoiceContext);
  if (!context) throw new Error('useVoice must be used within VoiceProvider');
  return context;
}
