
import React from 'react';
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface StatusIndicatorProps {
  status: 'checking' | 'success' | 'error' | 'warning';
  label: string;
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, label, className = '' }) => {
  const getIcon = () => {
    switch (status) {
      case 'success': 
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error': 
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'warning': 
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'checking': 
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      default: 
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getBadge = () => {
    switch (status) {
      case 'success': 
        return <Badge variant="default" className="bg-green-100 text-green-800">OK</Badge>;
      case 'error': 
        return <Badge variant="destructive">ERRO</Badge>;
      case 'warning': 
        return <Badge variant="outline" className="border-yellow-500 text-yellow-700">ATENÇÃO</Badge>;
      case 'checking': 
        return <Badge variant="secondary">VERIFICANDO</Badge>;
      default: 
        return <Badge variant="outline">DESCONHECIDO</Badge>;
    }
  };

  return (
    <div className={`flex items-center justify-between p-3 border rounded-lg ${className}`}>
      <span className="font-medium">{label}</span>
      <div className="flex items-center gap-2">
        {getIcon()}
        {getBadge()}
      </div>
    </div>
  );
};
