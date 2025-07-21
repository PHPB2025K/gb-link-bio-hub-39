
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
    isCustomDomainActive: boolean;
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
      isCustomDomainActive: false,
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
      isCustomDomainActive: false,
    };

    try {
      // Check if we're already on the custom domain
      if (window.location.hostname === domain) {
        details.isCustomDomainActive = true;
        details.connectivity = true;
        details.ssl = window.location.protocol === 'https:';
        details.dns = true;
        console.log('✅ Acessando através do domínio personalizado!');
      }

      // Test connectivity to the domain
      try {
        const response = await fetch(`https://${domain}`, { 
          method: 'HEAD', 
          mode: 'no-cors',
          signal: AbortSignal.timeout(10000)
        });
        details.connectivity = true;
        details.ssl = true;
        console.log('✅ Domínio responde via HTTPS');
      } catch (error) {
        console.log('❌ Erro HTTPS:', error);
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
          errors.pop(); // Remove o erro anterior
          errors.push('Domínio responde apenas via HTTP (sem SSL)');
          console.log('⚠️ Domínio responde apenas via HTTP');
        } catch {
          errors.push('Domínio não responde em HTTP nem HTTPS');
          console.log('❌ Domínio não responde');
        }
      }

      // Check DNS resolution using public DNS API
      try {
        const dnsResponse = await fetch(`https://dns.google/resolve?name=${domain}&type=A`);
        const dnsData = await dnsResponse.json();
        details.dns = dnsData.Status === 0 && dnsData.Answer && dnsData.Answer.length > 0;
        
        if (details.dns) {
          console.log('✅ DNS está resolvendo:', dnsData.Answer);
          
          // Check if it's pointing to GitHub Pages IPs
          const githubIPs = ['185.199.108.153', '185.199.109.153', '185.199.110.153', '185.199.111.153'];
          const resolvedIPs = dnsData.Answer.map((answer: any) => answer.data);
          const isGitHubPages = resolvedIPs.some((ip: string) => githubIPs.includes(ip));
          
          if (isGitHubPages) {
            console.log('✅ DNS aponta para GitHub Pages IPs');
          } else {
            console.log('⚠️ DNS não aponta para GitHub Pages IPs:', resolvedIPs);
          }
        } else {
          errors.push('DNS não está resolvendo corretamente');
          console.log('❌ DNS não resolve');
        }
      } catch (dnsError) {
        errors.push('Erro ao verificar DNS');
        console.log('❌ Erro DNS API:', dnsError);
      }

      // Check www redirect
      try {
        await fetch(`https://www.${domain}`, { 
          method: 'HEAD', 
          mode: 'no-cors',
          signal: AbortSignal.timeout(5000)
        });
        details.redirects = true;
        console.log('✅ WWW redirect funciona');
      } catch {
        details.redirects = false;
        console.log('⚠️ WWW redirect pode não estar funcionando');
      }

      details.responseTime = Date.now() - startTime;

      const status = errors.length === 0 ? 'success' : 
                    (details.connectivity || details.isCustomDomainActive) ? 'warning' : 'error';

      setResult({
        status,
        details,
        lastCheck: new Date(),
        errors,
      });

      const message = details.isCustomDomainActive 
        ? 'Domínio personalizado está ATIVO!' 
        : errors.length === 0 
          ? 'Domínio configurado corretamente!' 
          : `${errors.length} itens para revisar`;

      toast({
        title: "Verificação de Domínio Concluída",
        description: message,
        variant: details.isCustomDomainActive || errors.length === 0 ? "default" : "destructive",
      });

    } catch (error) {
      console.log('❌ Erro geral:', error);
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
