
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface DomainCheckResult {
  status: 'checking' | 'success' | 'error' | 'warning';
  details: {
    dns: boolean;
    connectivity: boolean;
    ssl: boolean;
    redirects: boolean;
    responseTime?: number;
  };
  lastCheck: Date | null;
  errors: string[];
}

export const useDomainCheck = (domain: string) => {
  const [result, setResult] = useState<DomainCheckResult>({
    status: 'checking',
    details: {
      dns: false,
      connectivity: false,
      ssl: false,
      redirects: false,
    },
    lastCheck: null,
    errors: [],
  });
  const { toast } = useToast();

  const checkDomain = async () => {
    setResult(prev => ({ ...prev, status: 'checking', errors: [] }));
    const startTime = Date.now();
    const errors: string[] = [];
    const details = {
      dns: false,
      connectivity: false,
      ssl: false,
      redirects: false,
      responseTime: 0,
    };

    try {
      // Test basic connectivity
      try {
        const response = await fetch(`https://${domain}`, { 
          method: 'HEAD', 
          mode: 'no-cors',
          signal: AbortSignal.timeout(10000)
        });
        details.connectivity = true;
        details.ssl = true; // If HTTPS works, SSL is working
      } catch (error) {
        details.connectivity = false;
        errors.push('Domínio não está respondendo via HTTPS');
        
        // Try HTTP fallback
        try {
          await fetch(`http://${domain}`, { 
            method: 'HEAD', 
            mode: 'no-cors',
            signal: AbortSignal.timeout(5000)
          });
          details.connectivity = true;
          details.ssl = false;
          errors.push('Domínio responde apenas via HTTP (sem SSL)');
        } catch {
          errors.push('Domínio não responde em HTTP nem HTTPS');
        }
      }

      // Check DNS resolution using public DNS API
      try {
        const dnsResponse = await fetch(`https://dns.google/resolve?name=${domain}&type=A`);
        const dnsData = await dnsResponse.json();
        details.dns = dnsData.Status === 0 && dnsData.Answer && dnsData.Answer.length > 0;
        if (!details.dns) {
          errors.push('DNS não está resolvendo corretamente');
        }
      } catch {
        errors.push('Erro ao verificar DNS');
      }

      // Check redirects (www vs non-www)
      try {
        const wwwResponse = await fetch(`https://www.${domain}`, { 
          method: 'HEAD', 
          mode: 'no-cors',
          signal: AbortSignal.timeout(5000)
        });
        details.redirects = true;
      } catch {
        // Check if www redirects are needed
        details.redirects = false;
      }

      details.responseTime = Date.now() - startTime;

      const status = errors.length === 0 ? 'success' : 
                    details.connectivity ? 'warning' : 'error';

      setResult({
        status,
        details,
        lastCheck: new Date(),
        errors,
      });

      toast({
        title: "Verificação de Domínio Concluída",
        description: `${errors.length === 0 ? 'Tudo funcionando!' : `${errors.length} problemas encontrados`}`,
        variant: errors.length === 0 ? "default" : "destructive",
      });

    } catch (error) {
      setResult({
        status: 'error',
        details,
        lastCheck: new Date(),
        errors: ['Erro geral na verificação do domínio'],
      });

      toast({
        title: "Erro na Verificação",
        description: "Não foi possível verificar o domínio",
        variant: "destructive",
      });
    }
  };

  return { result, checkDomain };
};
