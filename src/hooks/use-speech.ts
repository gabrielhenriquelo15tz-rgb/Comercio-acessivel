"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
}

interface SpeechHook {
  isSpeaking: boolean;
  isListening: boolean;
  speak: (text: string, lang?: string) => void;
  stopSpeaking: () => void;
  startListening: (lang?: string) => void;
  stopListening: () => void;
  transcript: string;
  clearTranscript: () => void;
  hasSpeechRecognition: boolean;
  hasSpeechSynthesis: boolean;
}

export function useSpeech(): SpeechHook {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);

  const hasSpeechRecognition = typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
  const hasSpeechSynthesis = typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    if (hasSpeechRecognition) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const sr = new SpeechRecognition();
      sr.continuous = false; // Listen for a single utterance
      sr.interimResults = false; // Only return final results
      sr.lang = 'pt-BR'; // Default language

      sr.onstart = () => {
        setIsListening(true);
        setTranscript('');
        toast.info("Ouvindo...", { duration: 1500 });
      };

      sr.onresult = (event: SpeechRecognitionEvent) => {
        const last = event.results.length - 1;
        const result = event.results[last][0] as SpeechRecognitionResult;
        setTranscript(result.transcript);
        toast.success(`Você disse: "${result.transcript}"`, { duration: 2000 });
      };

      sr.onend = () => {
        setIsListening(false);
        toast.info("Parou de ouvir.", { duration: 1500 });
      };

      sr.onerror = (event: SpeechRecognitionErrorEvent) => {
        setIsListening(false);
        console.error('Speech recognition error:', event.error);
        toast.error(`Erro de reconhecimento de voz: ${event.error}`, { duration: 3000 });
      };

      setRecognition(sr);
    }

    if (hasSpeechSynthesis) {
      setSynth(window.speechSynthesis);
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
      if (synth) {
        synth.cancel();
      }
    };
  }, [hasSpeechRecognition, hasSpeechSynthesis]);

  const speak = useCallback((text: string, lang: string = 'pt-BR') => {
    if (!synth) {
      toast.error("Navegador não suporta síntese de fala.", { duration: 3000 });
      return;
    }
    if (isSpeaking) {
      synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (event) => {
      setIsSpeaking(false);
      console.error('Speech synthesis error:', event.error);
      toast.error(`Erro na fala: ${event.error}`, { duration: 3000 });
    };

    synth.speak(utterance);
  }, [synth, isSpeaking]);

  const stopSpeaking = useCallback(() => {
    if (synth && isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
    }
  }, [synth, isSpeaking]);

  const startListening = useCallback((lang: string = 'pt-BR') => {
    if (!recognition) {
      toast.error("Navegador não suporta reconhecimento de fala.", { duration: 3000 });
      return;
    }
    if (isListening) {
      recognition.stop();
    }
    recognition.lang = lang;
    recognition.start();
  }, [recognition, isListening]);

  const stopListening = useCallback(() => {
    if (recognition && isListening) {
      recognition.stop();
    }
  }, [recognition, isListening]);

  const clearTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return {
    isSpeaking,
    isListening,
    speak,
    stopSpeaking,
    startListening,
    stopListening,
    transcript,
    clearTranscript,
    hasSpeechRecognition,
    hasSpeechSynthesis,
  };
}