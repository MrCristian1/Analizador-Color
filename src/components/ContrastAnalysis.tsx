import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Target } from 'lucide-react';
import { ContrastRatio, formatRatio } from '../utils/colorUtils';

interface ContrastAnalysisProps {
  contrast: ContrastRatio;
}

export function ContrastAnalysis({ contrast }: ContrastAnalysisProps) {
  const getStatusIcon = (passed: boolean) => {
    return passed ? (
      <CheckCircle className="w-4 h-4 text-green-500" />
    ) : (
      <XCircle className="w-4 h-4 text-red-500" />
    );
  };

  const getOverallStatus = () => {
    if (contrast.aaa) return { icon: CheckCircle, color: 'text-green-600', label: 'Excelente', bg: 'bg-green-50' };
    if (contrast.aa) return { icon: CheckCircle, color: 'text-blue-600', label: 'Bueno', bg: 'bg-blue-50' };
    if (contrast.aaLarge) return { icon: AlertCircle, color: 'text-yellow-600', label: 'Solo texto grande', bg: 'bg-yellow-50' };
    return { icon: XCircle, color: 'text-red-600', label: 'Insuficiente', bg: 'bg-red-50' };
  };

  const status = getOverallStatus();
  const StatusIcon = status.icon;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Target className="w-4 h-4 text-gray-600" />
        <h3 className="text-sm font-semibold text-gray-900">Análisis de Contraste</h3>
      </div>

      {/* Overall Status */}
      <div className={`p-3 rounded-lg ${status.bg} border flex items-center gap-3`}>
        <StatusIcon className={`w-5 h-5 ${status.color}`} />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              {formatRatio(contrast.ratio)}
            </span>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${status.color} ${status.bg}`}>
              {status.label}
            </span>
          </div>
        </div>
      </div>

      {/* WCAG Compliance */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-white border border-gray-200 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Nivel AA</h4>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Normal</span>
              {getStatusIcon(contrast.aa)}
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Grande</span>
              {getStatusIcon(contrast.aaLarge)}
            </div>
          </div>
        </div>

        <div className="p-3 bg-white border border-gray-200 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Nivel AAA</h4>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Normal</span>
              {getStatusIcon(contrast.aaa)}
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Grande</span>
              {getStatusIcon(contrast.aaaLarge)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}