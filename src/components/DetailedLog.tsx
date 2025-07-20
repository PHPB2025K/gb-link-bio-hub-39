
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, AlertTriangle, Info } from 'lucide-react';

interface DetailedLogProps {
  title: string;
  lastCheck: Date | null;
  errors: string[];
  info?: string[];
  details?: Record<string, any>;
}

export const DetailedLog: React.FC<DetailedLogProps> = ({ 
  title, 
  lastCheck, 
  errors, 
  info = [],
  details 
}) => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm">
          {title}
          {lastCheck && (
            <Badge variant="outline" className="text-xs">
              <Clock className="w-3 h-3 mr-1" />
              {lastCheck.toLocaleTimeString()}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {errors.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-red-600 flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              Problemas Encontrados:
            </h4>
            <ul className="text-sm space-y-1">
              {errors.map((error, index) => (
                <li key={index} className="text-red-700 pl-4 border-l-2 border-red-300">
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}

        {info.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-blue-600 flex items-center gap-1">
              <Info className="w-4 h-4" />
              Informações:
            </h4>
            <ul className="text-sm space-y-1">
              {info.map((item, index) => (
                <li key={index} className="text-blue-700 pl-4 border-l-2 border-blue-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {details && Object.keys(details).length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-600">Detalhes Técnicos:</h4>
            <div className="bg-gray-50 p-3 rounded text-xs font-mono">
              {Object.entries(details).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span>{key}:</span>
                  <span className={value ? 'text-green-600' : 'text-red-600'}>
                    {typeof value === 'boolean' ? (value ? '✓' : '✗') : value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
