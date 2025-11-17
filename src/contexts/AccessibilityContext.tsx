"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilityContextType {
  highContrast: boolean;
  fontSize: number; // 16, 20, 24, 32 (base, medium, large, x-large)
  simplifiedMode: boolean;
  toggleHighContrast: () => void;
  setFontSize: (size: number) => void;
  toggleSimplifiedMode: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(16); // Default base font size
  const [simplifiedMode, setSimplifiedMode] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedHighContrast = localStorage.getItem('highContrast');
    if (savedHighContrast) setHighContrast(JSON.parse(savedHighContrast));

    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) setFontSize(parseInt(savedFontSize));

    const savedSimplifiedMode = localStorage.getItem('simplifiedMode');
    if (savedSimplifiedMode) setSimplifiedMode(JSON.parse(savedSimplifiedMode));
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('highContrast', JSON.stringify(highContrast));
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize.toString());
    document.documentElement.style.setProperty('--base-font-size', `${fontSize}px`);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('simplifiedMode', JSON.stringify(simplifiedMode));
    if (simplifiedMode) {
      document.documentElement.classList.add('simplified-mode');
    } else {
      document.documentElement.classList.remove('simplified-mode');
    }
  }, [simplifiedMode]);

  const toggleHighContrast = () => setHighContrast(prev => !prev);
  const toggleSimplifiedMode = () => setSimplifiedMode(prev => !prev);

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        fontSize,
        simplifiedMode,
        toggleHighContrast,
        setFontSize,
        toggleSimplifiedMode,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};