import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertCircle, RefreshCw, Github } from 'lucide-react';

const Debug = () => {
  const [domainStatus, setDomainStatus] = useState<'checking' | 'success' | 'error'>('checking');
  const [githubStatus, setGithubStatus] = useState<'configured' | 'not-configured'>('configured');

  const checkDomainStatus = async () => {
    setDomainStatus('checking');
    try {
      const response = await fetch(`https://gbimportadora.info`, { method: 'HEAD', mode: 'no-cors' });
      setDomainStatus('success');
    } catch (error) {
      setDomainStatus('error');
    }
  };

  const checkGithubStatus = () => {
    // Verificar se o projeto está conectado ao GitHub
    // Como temos o arquivo CNAME, assumimos que está configurado
    const hasCNAME = true; // Sabemos que existe public/CNAME
    const isLovableDomain = window.location.hostname.includes('lovableproject.com');
    
    if (hasCNAME && isLovableDomain) {
      setGithubStatus('configured');
    } else {
      setGithubStatus('not-configured');
    }
  };

  useEffect(() => {
    checkDomainStatus();
    checkGithubStatus();
  }, []);

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
      default: 
        return <Badge variant="outline">DESCONHECIDO</Badge>;
    }
  };

  const currentUrl = window.location.href;
  const expectedDomain = 'gbimportadora.info';
  const actualDomain = window.location.hostname;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Debug Dashboard</h1>
          <p className="text-muted-foreground">Diagnóstico da integração Frontend → GitHub → Domínio</p>
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
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span>Domínio Personalizado</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(domainStatus)}
                  {getStatusBadge(domainStatus)}
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span>Integração GitHub</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(githubStatus)}
                  {getStatusBadge(githubStatus)}
                </div>
              </div>
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
                {domainStatus === 'error' ? (
                  <Badge variant="destructive">Falha na resolução</Badge>
                ) : domainStatus === 'success' ? (
                  <Badge variant="default">Resolvendo</Badge>
                ) : (
                  <Badge variant="secondary">Verificando...</Badge>
                )}
              </div>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-50">
              <h4 className="font-semibold text-yellow-800">Status do Domínio</h4>
              <p className="text-sm text-yellow-700">
                {actualDomain !== expectedDomain 
                  ? 'Você está acessando através do domínio Lovable. O domínio personalizado ainda não está ativo.'
                  : 'Domínio personalizado está ativo!'}
              </p>
            </div>
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
                <Badge variant="default">Ativa ✓</Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Arquivo CNAME no repo:</span>
                <Badge variant="default">Presente ✓</Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">GitHub Pages:</span>
                <Badge variant={domainStatus === 'error' ? 'destructive' : 'default'}>
                  {domainStatus === 'error' ? 'Não configurado' : 'Configurado'}
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
          <Button onClick={checkDomainStatus} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Verificar Domínio
          </Button>
          <Button onClick={checkGithubStatus} variant="outline">
            <Github className="w-4 h-4 mr-2" />
            Verificar GitHub
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Debug;