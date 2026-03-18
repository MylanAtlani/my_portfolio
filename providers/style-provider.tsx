'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Style = 'nothing' | 'liquid-glass';

interface StyleContextType {
  style: Style;
  setStyle: (style: Style) => void;
  toggleStyle: () => void;
}

const StyleContext = createContext<StyleContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio-style';

export function StyleProvider({ children }: { children: React.ReactNode }) {
  const [style, setStyleState] = useState<Style>('nothing');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY) as Style;
    if (stored && (stored === 'nothing' || stored === 'liquid-glass')) {
      setStyleState(stored);
      document.documentElement.setAttribute('data-style', stored);
    } else {
      document.documentElement.setAttribute('data-style', 'nothing');
    }
  }, []);

  const setStyle = (newStyle: Style) => {
    setStyleState(newStyle);
    localStorage.setItem(STORAGE_KEY, newStyle);
    document.documentElement.setAttribute('data-style', newStyle);
  };

  const toggleStyle = () => {
    setStyle(style === 'nothing' ? 'liquid-glass' : 'nothing');
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <StyleContext.Provider value={{ style, setStyle, toggleStyle }}>
      {children}
    </StyleContext.Provider>
  );
}

export function useStyle() {
  const context = useContext(StyleContext);
  if (context === undefined) {
    // Return default style during SSR or before provider is mounted
    return { style: 'nothing' as Style, setStyle: () => {}, toggleStyle: () => {} };
  }
  return context;
}
