import { ContrastRatio, ColorInfo, ColorSuggestion } from '../types';

/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

/**
 * Convert RGB to hex
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * Calculate relative luminance according to WCAG
 */
export function getRelativeLuminance(r: number, g: number, b: number): number {
  const getRsRGB = (color: number): number => {
    const sRGB = color / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  };

  return 0.2126 * getRsRGB(r) + 0.7152 * getRsRGB(g) + 0.0722 * getRsRGB(b);
}

/**
 * Calculate contrast ratio between two colors
 */
export function getContrastRatio(color1: ColorInfo, color2: ColorInfo): number {
  const l1 = Math.max(color1.luminance, color2.luminance);
  const l2 = Math.min(color1.luminance, color2.luminance);
  return (l1 + 0.05) / (l2 + 0.05);
}

/**
 * Get color information including luminance
 */
export function getColorInfo(hex: string): ColorInfo {
  const rgb = hexToRgb(hex);
  const luminance = getRelativeLuminance(rgb.r, rgb.g, rgb.b);
  
  return {
    hex,
    rgb,
    luminance
  };
}

/**
 * Analyze contrast according to WCAG guidelines
 */
export function analyzeContrast(background: string, text: string): ContrastRatio {
  const bgInfo = getColorInfo(background);
  const textInfo = getColorInfo(text);
  const ratio = getContrastRatio(bgInfo, textInfo);

  return {
    ratio,
    aa: ratio >= 4.5,
    aaa: ratio >= 7,
    aaLarge: ratio >= 3,
    aaaLarge: ratio >= 4.5
  };
}

/**
 * Generate accessible color suggestions
 */
export function generateColorSuggestions(baseColor: string, isBackground: boolean = true): ColorSuggestion[] {
  const suggestions: ColorSuggestion[] = [];
  const baseInfo = getColorInfo(baseColor);
  
  // Generate variations by adjusting lightness
  const steps = isBackground ? [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9] : [0.05, 0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85, 0.95];
  
  steps.forEach(lightness => {
    const newColor = adjustColorLightness(baseColor, lightness);
    const contrast = isBackground 
      ? analyzeContrast(baseColor, newColor)
      : analyzeContrast(newColor, baseColor);
    
    if (contrast.aa) {
      suggestions.push({
        background: isBackground ? baseColor : newColor,
        text: isBackground ? newColor : baseColor,
        ratio: contrast.ratio,
        level: contrast.aaa ? 'AAA' : 'AA'
      });
    }
  });

  // Add some common accessible combinations
  const commonColors = ['#000000', '#ffffff', '#1f2937', '#f9fafb', '#374151', '#e5e7eb'];
  commonColors.forEach(color => {
    if (color !== baseColor) {
      const contrast = isBackground 
        ? analyzeContrast(baseColor, color)
        : analyzeContrast(color, baseColor);
      
      if (contrast.aa) {
        suggestions.push({
          background: isBackground ? baseColor : color,
          text: isBackground ? color : baseColor,
          ratio: contrast.ratio,
          level: contrast.aaa ? 'AAA' : 'AA'
        });
      }
    }
  });

  // Remove duplicates and sort by ratio
  const unique = suggestions.filter((item, index, self) => 
    index === self.findIndex(t => t.background === item.background && t.text === item.text)
  );

  return unique.sort((a, b) => b.ratio - a.ratio).slice(0, 6);
}

/**
 * Adjust color lightness
 */
function adjustColorLightness(hex: string, lightness: number): string {
  const rgb = hexToRgb(hex);
  
  // Convert to HSL-like adjustment
  const newR = Math.round(255 * lightness);
  const newG = Math.round(255 * lightness);
  const newB = Math.round(255 * lightness);
  
  return rgbToHex(newR, newG, newB);
}

/**
 * Get a readable contrast color (black or white) for any background
 */
export function getContrastColor(backgroundColor: string): string {
  const bgInfo = getColorInfo(backgroundColor);
  return bgInfo.luminance > 0.5 ? '#000000' : '#ffffff';
}

/**
 * Format contrast ratio for display
 */
export function formatRatio(ratio: number): string {
  return `${ratio.toFixed(2)}:1`;
}

/**
 * Generate random accessible color combinations
 */
export function generateRandomAccessibleColors(): { background: string; text: string } {
  const accessibleCombinations = [
    // High contrast combinations
    { background: '#ffffff', text: '#000000' },
    { background: '#000000', text: '#ffffff' },
    { background: '#1f2937', text: '#ffffff' },
    { background: '#f9fafb', text: '#1f2937' },
    
    // Blue combinations
    { background: '#1e40af', text: '#ffffff' },
    { background: '#dbeafe', text: '#1e40af' },
    { background: '#3b82f6', text: '#ffffff' },
    { background: '#eff6ff', text: '#1e40af' },
    
    // Green combinations
    { background: '#166534', text: '#ffffff' },
    { background: '#dcfce7', text: '#166534' },
    { background: '#059669', text: '#ffffff' },
    { background: '#f0fdf4', text: '#166534' },
    
    // Purple combinations
    { background: '#7c3aed', text: '#ffffff' },
    { background: '#ede9fe', text: '#6b21a8' },
    { background: '#a855f7', text: '#ffffff' },
    { background: '#faf5ff', text: '#7c3aed' },
    
    // Red combinations
    { background: '#dc2626', text: '#ffffff' },
    { background: '#fef2f2', text: '#dc2626' },
    { background: '#ef4444', text: '#ffffff' },
    { background: '#fef2f2', text: '#b91c1c' },
    
    // Orange combinations
    { background: '#ea580c', text: '#ffffff' },
    { background: '#fff7ed', text: '#ea580c' },
    { background: '#f97316', text: '#ffffff' },
    { background: '#fffbeb', text: '#d97706' },
    
    // Teal combinations
    { background: '#0f766e', text: '#ffffff' },
    { background: '#f0fdfa', text: '#0f766e' },
    { background: '#14b8a6', text: '#ffffff' },
    { background: '#ccfbf1', text: '#0f766e' },
    
    // Gray combinations
    { background: '#374151', text: '#ffffff' },
    { background: '#f9fafb', text: '#374151' },
    { background: '#6b7280', text: '#ffffff' },
    { background: '#f3f4f6', text: '#374151' },
    
    // Indigo combinations
    { background: '#4338ca', text: '#ffffff' },
    { background: '#eef2ff', text: '#4338ca' },
    { background: '#6366f1', text: '#ffffff' },
    { background: '#f0f9ff', text: '#3730a3' },
  ];

  // Filter to only include combinations with good contrast
  const validCombinations = accessibleCombinations.filter(combo => {
    const analysis = analyzeContrast(combo.background, combo.text);
    return analysis.aa; // Ensure at least AA compliance
  });

  // Return a random valid combination
  const randomIndex = Math.floor(Math.random() * validCombinations.length);
  return validCombinations[randomIndex];
}