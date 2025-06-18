import React from 'react';
import { Lightbulb, Copy } from 'lucide-react';
import { ColorSuggestion } from '../types';
import { CopyButton } from './CopyButton';

interface ColorSuggestionsProps {
  suggestions: ColorSuggestion[];
  onApplySuggestion: (background: string, text: string) => void;
}

export function ColorSuggestions({ suggestions, onApplySuggestion }: ColorSuggestionsProps) {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-yellow-500" />
        <h3 className="text-lg font-semibold text-gray-900">Sugerencias Accesibles</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="group border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-all duration-200 hover:shadow-md cursor-pointer"
            onClick={() => onApplySuggestion(suggestion.background, suggestion.text)}
          >
            <div
              className="w-full h-20 rounded-lg mb-3 flex items-center justify-center text-sm font-medium transition-transform group-hover:scale-105"
              style={{ 
                backgroundColor: suggestion.background, 
                color: suggestion.text 
              }}
            >
              Texto de prueba
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">
                  {suggestion.ratio.toFixed(2)}:1
                </span>
                <span className={`
                  px-2 py-1 text-xs font-semibold rounded-full
                  ${suggestion.level === 'AAA' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                  }
                `}>
                  {suggestion.level}
                </span>
              </div>
              
              <div className="flex gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <div 
                    className="w-3 h-3 rounded border border-gray-300"
                    style={{ backgroundColor: suggestion.background }}
                  />
                  <span className="font-mono text-gray-600">
                    {suggestion.background.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div 
                    className="w-3 h-3 rounded border border-gray-300"
                    style={{ backgroundColor: suggestion.text }}
                  />
                  <span className="font-mono text-gray-600">
                    {suggestion.text.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="flex gap-1 pt-2">
                <CopyButton 
                  text={`${suggestion.background}, ${suggestion.text}`}
                  label="Copiar ambos"
                  className="text-xs px-2 py-1"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-500 text-center">
        Haz clic en cualquier sugerencia para aplicarla
      </p>
    </div>
  );
}