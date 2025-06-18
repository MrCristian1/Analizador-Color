import React from 'react';
import { Palette } from 'lucide-react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  className?: string;
}

export function ColorPicker({ label, value, onChange, className = '' }: ColorPickerProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="color"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-12 h-12 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-gray-300 transition-colors duration-200"
              style={{ backgroundColor: value }}
            />
            <Palette className="absolute inset-0 m-auto w-4 h-4 text-white drop-shadow-sm pointer-events-none" />
          </div>
          <div className="flex-1">
            <input
              type="text"
              value={value.toUpperCase()}
              onChange={(e) => {
                const color = e.target.value;
                if (/^#[0-9A-F]{6}$/i.test(color)) {
                  onChange(color);
                }
              }}
              className="w-full px-4 py-2 text-sm font-mono border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="#000000"
              maxLength={7}
            />
          </div>
        </div>
      </div>
    </div>
  );
}