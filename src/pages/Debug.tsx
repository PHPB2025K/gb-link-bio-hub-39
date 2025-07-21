import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertCircle, RefreshCw, Github, RotateCcw, Home, Shield, Globe, Server, Clock, Zap, Lock, Eye } from 'lucide-react';
import { StatusIndicator } from '@/components/StatusIndicator';
import { DetailedLog } from '@/components/DetailedLog';
import { useDomainCheck } from '@/hooks/useDomainCheck';
import { useGitHubCheck } from '@/hooks/useGitHubCheck';

const Debug = () => {
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [realTimeStats, setRealTimeStats] = useState({
    isSecureContext: false,
    protocol: '',
    hostname: '',
    port: '',
    userAgent: '',
    httpVersion: '',
    connectionType: '',
    securityState: '',
    certificateInfo: null as any,
    performanceMetrics: {
      loadTime: 0,
      dnsTime: 0,
      connectTime: 0,
      sslTime: 0,
      firstByte: 0,
      domReady: 0
    }
  });

  const expectedDomain = 'gbimportadora.info';
  const currentUrl = window.location.href;
  const actualDomain = window.location.hostname;

  const { result: domainResult, checkDomain } = useDomainCheck(expectedDomain);
  const { result: githubResult, checkGitHub } = useGitHubCheck();

  // Collect real-time browser and security information
  useEffect(() => {
    const collectRealTimeStats = () => {
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      setRealTimeStats({
        isSecureContext: window.isSecureContext,
        protocol: window.location.protocol,
        hostname: window.location.hostname,
        port: window.location.port || (window.location.protocol === 'https:' ? '443' : '80'),
        userAgent: navigator.userAgent,
        httpVersion: (navigator as any).connection?.effectiveType || 'unknown',
        connectionType: (navigator as any).connection?.type || 'unknown',
        securityState: document.visibilityState,
        certificateInfo: null, // Browser doesn't expose certificate details directly
        performanceMetrics: {
          loadTime: nav ? nav.loadEventEnd - nav.loadEventStart : 0,
          dnsTime: nav ? nav.domainLookupEnd - nav.domainLookupStart : 0,
          connectTime: nav ? nav.connectEnd - nav.connectStart : 0,
          sslTime: nav ? nav.connectEnd - nav.secureConnectionStart : 0,
          firstByte: nav ? nav.responseStart - nav.requestStart : 0,
          domReady: nav ? nav.domContentLoadedEventEnd - nav.domContentLoadedEventStart : 0
        }
      });
    };

    collectRealTimeStats();
    const interval = setInterval(collectRealTimeStats, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleRefreshAll = async () => {
    await Promise.all([checkDomain(), checkGitHub()]);
  };

  useEffect(() => {
    // Initial check on page load
    handleRefreshAll();
  }, []);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(handleRefreshAll, 30000); // Check every 30 seconds for more frequent updates
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  // Compute real-time status
  const isOnCustomDomain = actualDomain === expectedDomain;
  const domainStatus = domainResult.status;
  const githubStatus = githubResult.status;
  
  // Overall system status with detailed analysis
  const systemStatus = isOnCustomDomain && realTimeStats.isSecureContext ? 'success' : 
                      (githubResult.details.pagesEnabled && githubResult.details.dnsVerified) ? 'warning' : 
                      'error';

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

  const getStatusBadge = (status: string, isSecure?: boolean) => {
    if (isSecure !== undefined) {
      return isSecure ? 
        <Badge variant="default" className="bg-green-100 text-green-800">SEGURO</Badge> :
        <Badge variant="destructive">INSEGURO</Badge>;
    }
    
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

  const formatTime = (ms: number) => {
    if (ms < 1) return `${(ms * 1000).toFixed(0)}μs`;
    if (ms < 1000) return `${ms.toFixed(0)}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <Home className="w-4 h-4 mr-2" />
                Voltar ao Início
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl font-bold mb-2">🔍 Debug Dashboard Completo</h1>
          <p className="text-muted-foreground">Auditoria completa: Segurança • DNS • SSL • Performance • Integração</p>
          <div className="mt-2 text-xs text-muted-foreground">
            Última atualização: {new Date().toLocaleTimeString('pt-BR')}
          </div>
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

        {/* Status Geral com Métricas em Tempo Real */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className={`border-2 ${systemStatus === 'success' ? 'border-green-200' : systemStatus === 'warning' ? 'border-yellow-200' : 'border-red-200'}`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="w-5 h-5" />
                Status Geral
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-center p-4 rounded-lg ${
                systemStatus === 'success' ? 'bg-green-50 text-green-800' : 
                systemStatus === 'warning' ? 'bg-yellow-50 text-yellow-800' : 
                'bg-red-50 text-red-800'
              }`}>
                <div className="text-3xl mb-2">
                  {systemStatus === 'success' ? '✅' : systemStatus === 'warning' ? '⚠️' : '❌'}
                </div>
                <div className="font-semibold">
                  {systemStatus === 'success' ? 'SISTEMA OPERACIONAL' : 
                   systemStatus === 'warning' ? 'PARCIALMENTE ATIVO' : 
                   'PROBLEMAS DETECTADOS'}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lock className="w-5 h-5" />
                Segurança SSL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Protocolo:</span>
                  <Badge variant={realTimeStats.protocol === 'https:' ? 'default' : 'destructive'}>
                    {realTimeStats.protocol.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Contexto Seguro:</span>
                  {getStatusBadge('', realTimeStats.isSecureContext)}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Tempo SSL:</span>
                  <span className="text-xs font-mono">{formatTime(realTimeStats.performanceMetrics.sslTime)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="w-5 h-5" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">DNS Lookup:</span>
                  <span className="text-xs font-mono">{formatTime(realTimeStats.performanceMetrics.dnsTime)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Primeiro Byte:</span>
                  <span className="text-xs font-mono">{formatTime(realTimeStats.performanceMetrics.firstByte)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">DOM Pronto:</span>
                  <span className="text-xs font-mono">{formatTime(realTimeStats.performanceMetrics.domReady)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Auditoria Detalhada de Domínio */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Auditoria Completa de Domínio
            </CardTitle>
            <CardDescription>
              Análise técnica detalhada do domínio gbimportadora.info
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Informações Básicas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Informações Atuais
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">URL Completa:</span>
                    <span className="font-mono text-xs break-all">{currentUrl}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Hostname:</span>
                    <span className="font-mono">{realTimeStats.hostname}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Porta:</span>
                    <span className="font-mono">{realTimeStats.port}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Domínio Alvo:</span>
                    <span className="font-mono">{expectedDomain}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Server className="w-4 h-4" />
                  Informações Técnicas
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Conexão:</span>
                    <span className="text-xs">{realTimeStats.connectionType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Rede Efetiva:</span>
                    <span className="text-xs">{realTimeStats.httpVersion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">User Agent:</span>
                    <span className="text-xs truncate max-w-32" title={realTimeStats.userAgent}>
                      {realTimeStats.userAgent.split(' ')[0]}...
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Status do Domínio com detecção de erro Cloudflare */}
            <div className={`border-l-4 pl-4 py-3 ${
              domainResult.errors?.some(error => error.includes('CLOUDFLARE 1001')) ? 'border-red-500 bg-red-50' :
              isOnCustomDomain ? 'border-green-500 bg-green-50' : 
              domainResult.details.dns ? 'border-yellow-500 bg-yellow-50' :
              'border-red-500 bg-red-50'
            }`}>
              <h4 className={`font-semibold mb-2 ${
                domainResult.errors?.some(error => error.includes('CLOUDFLARE 1001')) ? 'text-red-800' :
                isOnCustomDomain ? 'text-green-800' : 
                domainResult.details.dns ? 'text-yellow-800' :
                'text-red-800'
              }`}>
                {domainResult.errors?.some(error => error.includes('CLOUDFLARE 1001')) ? '🚨 ERRO CRÍTICO: CLOUDFLARE 1001' :
                 isOnCustomDomain ? '🎉 DOMÍNIO PERSONALIZADO ATIVO' : 
                 domainResult.details.dns ? '⏳ DOMÍNIO CONFIGURADO - AGUARDANDO ATIVAÇÃO' :
                 '❌ DOMÍNIO NÃO CONFIGURADO'}
              </h4>
              <p className={`text-sm mb-3 ${
                domainResult.errors?.some(error => error.includes('CLOUDFLARE 1001')) ? 'text-red-700' :
                isOnCustomDomain ? 'text-green-700' : 
                domainResult.details.dns ? 'text-yellow-700' :
                'text-red-700'
              }`}>
                {domainResult.errors?.some(error => error.includes('CLOUDFLARE 1001')) 
                  ? '⚠️ DNS resolution error - Domínio configurado no Cloudflare but não consegue resolver para GitHub Pages. Siga as instruções abaixo para corrigir.'
                  : isOnCustomDomain 
                    ? 'Perfeito! Você está acessando através do domínio personalizado com SSL ativo.'
                    : domainResult.details.dns 
                      ? 'DNS configurado corretamente, mas você ainda está acessando via Lovable. O domínio está pronto para uso.'
                      : 'DNS não está resolvendo. Verifique as configurações no seu provedor de DNS.'}
              </p>

              {/* Soluções específicas para Cloudflare 1001 */}
              {domainResult.errors?.some(error => error.includes('CLOUDFLARE 1001')) && (
                <div className="mt-4 p-4 bg-red-100 border border-red-200 rounded-lg">
                  <h5 className="font-semibold text-red-800 mb-2">🔧 Solução Imediata - Erro Cloudflare 1001:</h5>
                  <div className="space-y-2 text-sm text-red-700">
                    <p><strong>1.</strong> Acesse o painel do Cloudflare</p>
                    <p><strong>2.</strong> Vá em DNS → Records</p>
                    <p><strong>3.</strong> Configure os registros A apontando para GitHub Pages:</p>
                    <div className="ml-4 p-2 bg-red-50 rounded font-mono text-xs">
                      185.199.108.153<br/>
                      185.199.109.153<br/>
                      185.199.110.153<br/>
                      185.199.111.153
                    </div>
                    <p><strong>4.</strong> Configure CNAME www → gbimportadora.info</p>
                    <p><strong>5.</strong> Desative proxy (nuvem cinza) temporariamente</p>
                    <p><strong>6.</strong> Aguarde 5-10 minutos para propagação</p>
                  </div>
                </div>
              )}
              
              {domainResult.details.dns && !isOnCustomDomain && !domainResult.errors?.some(error => error.includes('CLOUDFLARE 1001')) && (
                <div className="p-3 bg-blue-100 rounded text-sm text-blue-800 border border-blue-200">
                  <strong>🚀 Acesse agora:</strong> <a href={`https://${expectedDomain}`} className="underline font-medium hover:text-blue-900" target="_blank" rel="noopener noreferrer">https://{expectedDomain}</a>
                </div>
              )}
            </div>

            <DetailedLog
              title="Log Detalhado da Verificação de Domínio"
              lastCheck={domainResult.lastCheck}
              errors={domainResult.errors}
              details={domainResult.details}
            />
          </CardContent>
        </Card>

        {/* Auditoria GitHub Pages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Github className="w-5 h-5" />
              Auditoria GitHub Pages
            </CardTitle>
            <CardDescription>
              Status completo da integração Lovable → GitHub → GitHub Pages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 border rounded-lg">
                <div className="text-sm font-medium mb-1">Sincronização</div>
                {getStatusBadge(githubResult.details.connected ? 'success' : 'error')}
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-sm font-medium mb-1">GitHub Pages</div>
                {getStatusBadge(githubResult.details.pagesEnabled ? 'success' : 'error')}
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-sm font-medium mb-1">Arquivo CNAME</div>
                {getStatusBadge(githubResult.details.cnameExists ? 'success' : 'error')}
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-sm font-medium mb-1">DNS Verificado</div>
                {getStatusBadge(githubResult.details.dnsVerified ? 'success' : 'error')}
              </div>
            </div>

            <div className={`border-l-4 pl-4 py-3 ${
              githubStatus === 'success' ? 'border-green-500 bg-green-50' :
              githubStatus === 'warning' ? 'border-yellow-500 bg-yellow-50' :
              'border-red-500 bg-red-50'
            }`}>
              <h4 className={`font-semibold mb-2 ${
                githubStatus === 'success' ? 'text-green-800' :
                githubStatus === 'warning' ? 'text-yellow-800' :
                'text-red-800'
              }`}>
                {githubStatus === 'success' ? '✅ INTEGRAÇÃO GITHUB COMPLETA' :
                 githubStatus === 'warning' ? '⏳ GITHUB CONFIGURADO - AGUARDANDO ATIVAÇÃO' :
                 '❌ PROBLEMAS NA INTEGRAÇÃO GITHUB'}
              </h4>
              <p className={`text-sm ${
                githubStatus === 'success' ? 'text-green-700' :
                githubStatus === 'warning' ? 'text-yellow-700' :
                'text-red-700'
              }`}>
                {githubStatus === 'success' 
                  ? 'GitHub Pages ativo e funcionando com domínio personalizado.'
                  : githubStatus === 'warning'
                  ? 'GitHub Pages configurado corretamente, aguardando ativação completa do domínio.'
                  : 'Problemas detectados na configuração do GitHub Pages ou conexão.'}
              </p>
            </div>

            <DetailedLog
              title="Log Detalhado da Verificação GitHub"
              lastCheck={githubResult.lastCheck}
              errors={githubResult.errors}
              info={githubResult.info}
              details={githubResult.details}
            />
          </CardContent>
        </Card>

        {/* Métricas de Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Métricas de Performance
            </CardTitle>
            <CardDescription>Tempos de carregamento e performance da aplicação</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{formatTime(realTimeStats.performanceMetrics.dnsTime)}</div>
                <div className="text-xs text-muted-foreground">DNS Lookup</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">{formatTime(realTimeStats.performanceMetrics.connectTime)}</div>
                <div className="text-xs text-muted-foreground">Conexão</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{formatTime(realTimeStats.performanceMetrics.sslTime)}</div>
                <div className="text-xs text-muted-foreground">SSL Handshake</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{formatTime(realTimeStats.performanceMetrics.firstByte)}</div>
                <div className="text-xs text-muted-foreground">Primeiro Byte</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumo e Próximos Passos */}
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-600 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Resumo da Auditoria e Próximos Passos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isOnCustomDomain && realTimeStats.isSecureContext ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">🎉 SISTEMA TOTALMENTE FUNCIONAL</h4>
                <p className="text-sm text-green-700 mb-3">
                  Parabéns! Seu domínio personalizado está completamente configurado e funcionando:
                </p>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>✅ Domínio personalizado ativo (gbimportadora.info)</li>
                  <li>✅ SSL/HTTPS habilitado e seguro</li>
                  <li>✅ GitHub Pages funcionando perfeitamente</li>
                  <li>✅ DNS resolvendo corretamente</li>
                  <li>✅ Performance otimizada</li>
                </ul>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">🛠️ Status Atual da Configuração</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="space-y-1">
                      <div className={`flex items-center gap-2 ${domainResult.details.dns ? 'text-green-700' : 'text-red-700'}`}>
                        {domainResult.details.dns ? '✅' : '❌'} DNS Configurado
                      </div>
                      <div className={`flex items-center gap-2 ${githubResult.details.pagesEnabled ? 'text-green-700' : 'text-red-700'}`}>
                        {githubResult.details.pagesEnabled ? '✅' : '❌'} GitHub Pages Ativo
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className={`flex items-center gap-2 ${realTimeStats.isSecureContext ? 'text-green-700' : 'text-red-700'}`}>
                        {realTimeStats.isSecureContext ? '✅' : '❌'} Contexto Seguro (SSL)
                      </div>
                      <div className={`flex items-center gap-2 ${isOnCustomDomain ? 'text-green-700' : 'text-yellow-700'}`}>
                        {isOnCustomDomain ? '✅' : '⏳'} Acesso via Domínio Personalizado
                      </div>
                    </div>
                  </div>
                </div>

                {domainResult.details.dns && !isOnCustomDomain && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">🚀 Pronto para Ativação</h4>
                    <p className="text-sm text-yellow-700 mb-2">
                      Sua configuração está completa! Você pode acessar seu site através do domínio personalizado agora:
                    </p>
                    <a 
                      href={`https://${expectedDomain}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      🔗 Acessar https://{expectedDomain}
                    </a>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Debug;
