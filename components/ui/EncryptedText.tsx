import React, { useEffect, useState, useRef } from 'react';

interface EncryptedTextProps {
  text: string;
  className?: string;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+";

export const EncryptedText: React.FC<EncryptedTextProps> = ({ text, className = "" }) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    let iteration = 0;
    
    clearInterval(intervalRef.current as number);
    
    intervalRef.current = window.setInterval(() => {
      setDisplayText(prev => 
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current as number);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(intervalRef.current as number);
  }, [text]);

  return <span className={className}>{displayText}</span>;
};