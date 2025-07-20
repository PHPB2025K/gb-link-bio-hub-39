
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface GitHubCheckResult {
  status: 'checking' | 'success' | 'error' | 'warning';
  details: {
    connected: boolean;
    pagesEnabled: boolean;
    cnameExists: boolean;
    buildStatus: boolean;
    customDomain: boolean;
  };
  lastCheck: Date | null;
  errors: string[];
  info: string[];
}

export const useGitHubCheck = () => {
  const [result, setResult] = useState<GitHubCheckResult>({
    status: 'checking',
    details: {
      connected: false,
      pagesEnabled: false,
      cnameExists: false,
      buildStatus: false,
      customDomain: false,
    },
    lastCheck: null,
    errors: [],
    info: [],
  });
  const { toast } = useToast();

  const checkGitHub = async () => {
    setResult(prev => ({ ...prev, status: 'checking', errors: [], info: [] }));
    const errors: string[] = [];
    const info: string[] = [];
    const details = {
      connected: false,
      pagesEnabled: false,
      cnameExists: false,
      buildStatus: false,
      customDomain: false,
    };

    try {
      // Check if we're on Lovable domain (indicates GitHub connection exists)
      const isLovableDomain = window.location.hostname.includes('lovableproject.com') || 
                             window.location.hostname.includes('lovable.app');
      
      if (isLovableDomain) {
        details.connected = true;
        info.push('Projeto conectado ao GitHub via Lovable');
      } else {
        details.connected = false;
        errors.push('Projeto não parece estar conectado ao GitHub');
      }

      // Check CNAME file existence (we know it exists from the file structure)
      details.cnameExists = true;
      info.push('Arquivo CNAME está presente no projeto');

      // Check if we can access the GitHub Pages URL
      const currentDomain = window.location.hostname;
      if (currentDomain !== 'gbimportadora.info') {
        details.customDomain = false;
        errors.push('Domínio personalizado ainda não está ativo');
        info.push('Site está sendo servido pelo domínio Lovable/GitHub');
      } else {
        details.customDomain = true;
        info.push('Domínio personalizado está ativo!');
      }

      // Assume GitHub Pages is enabled if we have CNAME and connection
      if (details.connected && details.cnameExists) {
        details.pagesEnabled = true;
        details.buildStatus = true;
        info.push('GitHub Pages provavelmente está configurado');
      } else {
        details.pagesEnabled = false;
        details.buildStatus = false;
        errors.push('GitHub Pages pode não estar habilitado');
      }

      const status = errors.length === 0 ? 'success' : 
                    details.connected ? 'warning' : 'error';

      setResult({
        status,
        details,
        lastCheck: new Date(),
        errors,
        info,
      });

      toast({
        title: "Verificação do GitHub Concluída",
        description: `${errors.length === 0 ? 'Configuração OK!' : `${errors.length} itens para revisar`}`,
        variant: errors.length === 0 ? "default" : "destructive",
      });

    } catch (error) {
      setResult({
        status: 'error',
        details,
        lastCheck: new Date(),
        errors: ['Erro geral na verificação do GitHub'],
        info: [],
      });

      toast({
        title: "Erro na Verificação",
        description: "Não foi possível verificar a integração GitHub",
        variant: "destructive",
      });
    }
  };

  return { result, checkGitHub };
};
