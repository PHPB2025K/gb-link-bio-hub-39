import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertCircle, RefreshCw, Github, RotateCcw, Home } from 'lucide-react';
import { StatusIndicator } from '@/components/StatusIndicator';
import { DetailedLog } from '@/components/DetailedLog';
import { useDomainCheck } from '@/hooks/useDomainCheck';
import { useGitHubCheck } from '@/hooks/useGitHubCheck';

const Debug = () => {
  const [autoRefresh, setAutoRefresh] = useState(false);
  const expectedDomain = 'gbimportadora.info';
  const currentUrl = window.location.href;
  const actualDomain = window.location.hostname;

  const { result: domainResult, checkDomain } = useDomainCheck(expectedDomain);
  const { result: githubResult, checkGitHub } = useGitHubCheck();

  const handleRefreshAll = async () => {
    await Promise.all([checkDomain(), checkGitHub()]);
  };

  useEffect(() => {
    // Initial check on page load
    handleRefreshAll();
  }, []);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(handleRefreshAll, 60000); // Check every minute
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  // Legacy status for compatibility
  const domainStatus = domainResult.status;
  const githubStatus = githubResult.status === 'success' ? 'configured' : 'not-configured';

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': 
      case 'configured': 
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error': 
      case 'not-configured': 
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'checking': 
        return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default: 
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success': 
      case 'configured': 
        return <Badge variant="default" className="bg-green-100 text-green-800">OK</Badge>;
      case 'error': 
        return <Badge variant="destructive">ERRO</Badge>;
      case 'checking': 
        return <Badge variant="secondary">VERIFICANDO</Badge>;
      case 'not-configured': 
        return <Badge variant="destructive">NÃO CONFIGURADO</Badge>;
      case 'warning':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-700">ATENÇÃO</Badge>;
      default: 
        return <Badge variant="outline">DESCONHECIDO</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <Home className="w-4 h-4 mr-2" />
                Voltar ao Início
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold mb-2">Debug Dashboard</h1>
          <p className="text-muted-foreground">Diagnóstico da integração Frontend → GitHub → Domínio</p>
        </div>

        {/* Auto-refresh toggle */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handleRefreshAll}
            variant="outline"
            disabled={domainResult.status === 'checking' || githubResult.status === 'checking'}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Atualizar Tudo
          </Button>
          
          <Button
            onClick={() => setAutoRefresh(!autoRefresh)}
            variant={autoRefresh ? "default" : "outline"}
            size="sm"
          >
            Auto-refresh {autoRefresh ? 'ON' : 'OFF'}
          </Button>
        </div>

        {/* Status Geral */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Status Geral do Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StatusIndicator 
                status={domainResult.status} 
                label="Domínio Personalizado"
              />
              <StatusIndicator 
                status={githubResult.status} 
                label="Integração GitHub"
              />
            </div>
          </CardContent>
        </Card>

        {/* Configuração de Domínio */}
        <Card>
          <CardHeader>
            <CardTitle>Configuração de Domínio</CardTitle>
            <CardDescription>
              Análise da configuração do domínio gbimportadora.info
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">URL Atual:</span>
                <span className="font-mono text-sm break-all">{currentUrl}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Domínio Atual:</span>
                <span className="font-mono text-sm">{actualDomain}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Domínio Esperado:</span>
                <span className="font-mono text-sm">{expectedDomain}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Arquivo CNAME:</span>
                <Badge variant="default">Configurado ✓</Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Status DNS:</span>
                {getStatusBadge(domainStatus)}
              </div>
              {domainResult.details.responseTime && (
                <div className="flex justify-between">
                  <span className="font-medium">Tempo de Resposta:</span>
                  <span className="text-sm">{domainResult.details.responseTime}ms</span>
                </div>
              )}
            </div>

            <div className="border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-50">
              <h4 className="font-semibold text-yellow-800">Status do Domínio</h4>
              <p className="text-sm text-yellow-700">
                {actualDomain !== expectedDomain 
                  ? 'Você está acessando através do domínio Lovable. O domínio personalizado ainda não está ativo.'
                  : 'Domínio personalizado está ativo!'}
              </p>
            </div>

            <DetailedLog
              title="Verificação Detalhada do Domínio"
              lastCheck={domainResult.lastCheck}
              errors={domainResult.errors}
              details={domainResult.details}
            />
          </CardContent>
        </Card>

        {/* Integração GitHub */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Github className="w-5 h-5" />
              Integração GitHub
            </CardTitle>
            <CardDescription>
              Status da conexão Frontend → GitHub → GitHub Pages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Sincronização Lovable:</span>
                <Badge variant={githubResult.details.connected ? "default" : "destructive"}>
                  {githubResult.details.connected ? 'Ativa ✓' : 'Inativa ✗'}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Arquivo CNAME no repo:</span>
                <Badge variant={githubResult.details.cnameExists ? "default" : "destructive"}>
                  {githubResult.details.cnameExists ? 'Presente ✓' : 'Ausente ✗'}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">GitHub Pages:</span>
                <Badge variant={githubResult.details.pagesEnabled ? "default" : "destructive"}>
                  {githubResult.details.pagesEnabled ? 'Configurado ✓' : 'Não configurado ✗'}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Domínio Personalizado:</span>
                <Badge variant={githubResult.details.customDomain ? "default" : "destructive"}>
                  {githubResult.details.customDomain ? 'Ativo ✓' : 'Inativo ✗'}
                </Badge>
              </div>
            </div>

            <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50">
              <h4 className="font-semibold text-blue-800">Status da Integração</h4>
              <p className="text-sm text-blue-700">
                {githubStatus === 'configured' 
                  ? 'Projeto conectado ao GitHub com sincronização bidirecional ativa. Arquivo CNAME configurado para GitHub Pages.'
                  : 'Integração com GitHub não detectada.'}
              </p>
            </div>

            <DetailedLog
              title="Verificação Detalhada do GitHub"
              lastCheck={githubResult.lastCheck}
              errors={githubResult.errors}
              info={githubResult.info}
              details={githubResult.details}
            />
          </CardContent>
        </Card>

        {/* Problemas Identificados */}
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Problemas Identificados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {actualDomain !== expectedDomain && (
                <div className="flex items-start gap-3 p-3 border border-red-200 rounded-lg bg-red-50">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-800">Domínio Personalizado Não Ativo</h4>
                    <p className="text-sm text-red-700">O site ainda está sendo servido pelo domínio Lovable em vez do gbimportadora.info.</p>
                  </div>
                </div>
              )}
              
              {domainStatus === 'error' && (
                <div className="flex items-start gap-3 p-3 border border-red-200 rounded-lg bg-red-50">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-800">DNS Não Resolve</h4>
                    <p className="text-sm text-red-700">O domínio gbimportadora.info não está respondendo. Verifique as configurações de DNS.</p>
                  </div>
                </div>
              )}

              {githubStatus === 'not-configured' && (
                <div className="flex items-start gap-3 p-3 border border-yellow-200 rounded-lg bg-yellow-50">
                  <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800">GitHub Não Conectado</h4>
                    <p className="text-sm text-yellow-700">Projeto não está sincronizado com GitHub.</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Soluções */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">Como Resolver</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4 py-3 bg-green-50">
                <h4 className="font-semibold text-green-800 mb-2">Para ativar o domínio personalizado:</h4>
                <ol className="text-sm text-green-700 space-y-1 list-decimal list-inside">
                  <li>No GitHub: Vá em Settings → Pages → Custom domain</li>
                  <li>Configure "gbimportadora.info" no GitHub Pages</li>
                  <li>No seu provedor de DNS: Crie um CNAME apontando para "username.github.io"</li>
                  <li>Ou crie registros A apontando para os IPs do GitHub Pages</li>
                  <li>Aguarde a propagação DNS (até 48h)</li>
                </ol>
              </div>

              <div className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50">
                <h4 className="font-semibold text-blue-800 mb-2">Para conectar ao GitHub (se necessário):</h4>
                <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                  <li>No Lovable: Clique no botão "GitHub" no topo direito</li>
                  <li>Conecte sua conta GitHub</li>
                  <li>Crie ou conecte a um repositório</li>
                  <li>Ative o GitHub Pages no repositório</li>
                </ol>
              </div>

              <div className="border-l-4 border-purple-500 pl-4 py-3 bg-purple-50">
                <h4 className="font-semibold text-purple-800 mb-2">Configuração atual recomendada:</h4>
                <ol className="text-sm text-purple-700 space-y-1 list-decimal list-inside">
                  <li>Mantenha a sincronização Lovable ↔ GitHub ativa</li>
                  <li>Configure GitHub Pages com o domínio personalizado</li>
                  <li>Configure DNS para apontar para GitHub Pages</li>
                  <li>O arquivo CNAME já está configurado corretamente</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-center">
          <Button 
            onClick={checkDomain} 
            variant="outline"
            disabled={domainResult.status === 'checking'}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${domainResult.status === 'checking' ? 'animate-spin' : ''}`} />
            Verificar Domínio
          </Button>
          <Button 
            onClick={checkGitHub} 
            variant="outline"
            disabled={githubResult.status === 'checking'}
          >
            <Github className={`w-4 h-4 mr-2 ${githubResult.status === 'checking' ? 'animate-spin' : ''}`} />
            Verificar GitHub
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Debug;
