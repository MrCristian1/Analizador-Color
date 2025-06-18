import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export function CopyButton({ text, label, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`
        inline-flex items-center gap-2 px-3 py-2 text-sm font-medium
        border border-gray-300 rounded-lg
        hover:bg-gray-50 hover:border-gray-400
        focus:ring-2 focus:ring-blue-500 focus:border-transparent
        transition-all duration-200
        ${copied ? 'text-green-700 border-green-300 bg-green-50' : 'text-gray-700'}
        ${className}
      `}
      disabled={copied}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          ¡Copiado!
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          {label || 'Copiar'}
        </>
      )}
    </button>
  );
}