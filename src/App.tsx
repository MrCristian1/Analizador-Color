import React, { useState, useEffect, useMemo } from 'react';
import { Palette, Github, Heart, Shuffle } from 'lucide-react';
import { ColorPicker } from './components/ColorPicker';
import { ContrastPreview } from './components/ContrastPreview';
import { ContrastAnalysis } from './components/ContrastAnalysis';
import { ColorSuggestions } from './components/ColorSuggestions';
import { CopyButton } from './components/CopyButton';
import { analyzeContrast, generateColorSuggestions, generateRandomAccessibleColors } from './utils/colorUtils';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [backgroundColor, setBackgroundColor] = useLocalStorage('backgroundColor', '#ffffff');
  const [textColor, setTextColor] = useLocalStorage('textColor', '#000000');

  // Calculate contrast analysis
  const contrastAnalysis = useMemo(() => {
    return analyzeContrast(backgroundColor, textColor);
  }, [backgroundColor, textColor]);

  // Generate suggestions when contrast is poor
  const suggestions = useMemo(() => {
    if (contrastAnalysis.aa) return [];
    return generateColorSuggestions(backgroundColor, true);
  }, [backgroundColor, contrastAnalysis.aa]);

  const applySuggestion = (newBackground: string, newText: string) => {
    setBackgroundColor(newBackground);
    setTextColor(newText);
  };

  const resetColors = () => {
    setBackgroundColor('#ffffff');
    setTextColor('#000000');
  };

  const generateRandomColors = () => {
    const randomColors = generateRandomAccessibleColors();
    setBackgroundColor(randomColors.background);
    setTextColor(randomColors.text);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Analizador de Contraste</h1>
                <p className="text-sm text-gray-500">Analiza la accesibilidad de tus colores</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={generateRandomColors}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 hover:scale-105 shadow-md"
              >
                <Shuffle className="w-4 h-4" />
                Aleatorio
              </button>
              <button
                onClick={resetColors}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Reiniciar
              </button>
              <a
                href="https://github.com/stars/MrCristian1/lists/proyectos"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Controls Panel */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Color Pickers */}
            <div className="lg:col-span-1">
              <div className="space-y-4">
                <ColorPicker
                  label="Color de Fondo"
                  value={backgroundColor}
                  onChange={setBackgroundColor}
                />
                <ColorPicker
                  label="Color de Texto"
                  value={textColor}
                  onChange={setTextColor}
                />
                <div className="flex gap-2 flex-wrap pt-2">
                  <CopyButton 
                    text={backgroundColor}
                    label={`${backgroundColor.toUpperCase()}`}
                    className="text-xs px-2 py-1"
                  />
                  <CopyButton 
                    text={textColor}
                    label={`${textColor.toUpperCase()}`}
                    className="text-xs px-2 py-1"
                  />
                  <CopyButton 
                    text={`background: ${backgroundColor}; color: ${textColor};`}
                    label="CSS"
                    className="text-xs px-2 py-1"
                  />
                </div>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="lg:col-span-1">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Combinaciones Populares</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { bg: '#ffffff', text: '#1f2937', name: 'Clásico' },
                  { bg: '#1f2937', text: '#ffffff', name: 'Oscuro' },
                  { bg: '#f3f4f6', text: '#374151', name: 'Suave' },
                  { bg: '#3b82f6', text: '#ffffff', name: 'Azul' },
                  { bg: '#059669', text: '#ffffff', name: 'Verde' },
                  { bg: '#dc2626', text: '#ffffff', name: 'Rojo' },
                ].map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setBackgroundColor(preset.bg);
                      setTextColor(preset.text);
                    }}
                    className="p-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-sm text-xs"
                    style={{ backgroundColor: preset.bg, color: preset.text }}
                  >
                    <div className="font-medium">{preset.name}</div>
                    <div className="opacity-75">Aa</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Contrast Analysis */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-lg p-4">
                <ContrastAnalysis contrast={contrastAnalysis} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Preview */}
      <main className="flex-1">
        <ContrastPreview 
          backgroundColor={backgroundColor}
          textColor={textColor}
        />
      </main>

      {/* Suggestions Section */}
      {suggestions.length > 0 && (
        <div className="bg-white border-t border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ColorSuggestions 
              suggestions={suggestions}
              onApplySuggestion={applySuggestion}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;