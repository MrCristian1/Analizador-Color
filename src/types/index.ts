export interface ContrastRatio {
  ratio: number;
  aa: boolean;
  aaa: boolean;
  aaLarge: boolean;
  aaaLarge: boolean;
}

export interface ColorInfo {
  hex: string;
  rgb: { r: number; g: number; b: number };
  luminance: number;
}

export interface ColorSuggestion {
  background: string;
  text: string;
  ratio: number;
  level: 'AA' | 'AAA';
}