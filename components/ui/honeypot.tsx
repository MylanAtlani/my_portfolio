'use client';

import { useEffect, useRef } from 'react';

interface HoneypotProps {
  name: string;
}

export function Honeypot({ name }: HoneypotProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Masquer le champ avec CSS
    if (inputRef.current) {
      inputRef.current.style.position = 'absolute';
      inputRef.current.style.left = '-9999px';
      inputRef.current.style.opacity = '0';
      inputRef.current.style.pointerEvents = 'none';
    }
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      name={name}
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
    />
  );
} 