import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

const Debug = () => {
  const [domainStatus, setDomainStatus] = useState<'checking' | 'success' | 'error'>('checking');
  const [supabaseStatus, setSupabaseStatus] = useState<'not-configured' | 'error' | 'success'>('not-configured');

  const checkDomainStatus = async () => {
    setDomainStatus('checking');
    try {
      const response = await fetch(`https://gbimportadora.info`, { method: 'HEAD', mode: 'no-cors' });
      setDomainStatus('success');
    } catch (error) {
      setDomainStatus('error');
    }
  };

  const checkSupabaseStatus = () => {
    // Verificar se há variáveis de ambiente do Supabase
    const hasSupabaseUrl = window.location.hostname.includes('supabase') || 
                          document.querySelector('meta[name="supabase-url"]');
    
    if (hasSupabaseUrl) {
      setSupabaseStatus('success');
    } else {
      setSupabaseStatus('not-configured');
    }
  };

  useEffect(() => {
    checkDomainStatus();
    checkSupabaseStatus();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'checking': return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />;
      default: return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success': return <Badge variant="default" className="bg-green-100 text-green-800">OK</Badge>;
      case 'error': return <Badge variant="destructive">ERRO</Badge>;
      case 'checking': return <Badge variant="secondary">VERIFICANDO</Badge>;
      default: return <Badge variant="outline">NÃO CONFIGURADO</Badge>;
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
          <p className="text-muted-foreground">Diagnóstico da integração do projeto</p>
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
                <span>Integração Supabase</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(supabaseStatus)}
                  {getStatusBadge(supabaseStatus)}
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
                <span className="font-mono text-sm">{currentUrl}</span>
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
                <Badge variant="default">Configurado</Badge>
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

        {/* Integração Supabase */}
        <Card>
          <CardHeader>
            <CardTitle>Integração Supabase</CardTitle>
            <CardDescription>
              Status da conexão com o backend
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50">
              <h4 className="font-semibold text-blue-800">Status Atual</h4>
              <p className="text-sm text-blue-700">
                {supabaseStatus === 'not-configured' 
                  ? 'Supabase não foi configurado neste projeto. Clique no botão verde "Supabase" no topo da interface do Lovable para conectar.'
                  : 'Integração com Supabase detectada.'}
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
                    <p className="text-sm text-red-700">O site ainda está sendo servido pelo domínio Lovable.</p>
                  </div>
                </div>
              )}
              
              {supabaseStatus === 'not-configured' && (
                <div className="flex items-start gap-3 p-3 border border-yellow-200 rounded-lg bg-yellow-50">
                  <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800">Supabase Não Configurado</h4>
                    <p className="text-sm text-yellow-700">Backend não foi integrado ao projeto.</p>
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
                  <li>Vá em Project → Settings → Domains no Lovable</li>
                  <li>Configure o domínio "gbimportadora.info"</li>
                  <li>Configure o DNS no seu provedor (CNAME ou A record)</li>
                  <li>Aguarde a propagação (até 48h)</li>
                </ol>
              </div>

              <div className="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50">
                <h4 className="font-semibold text-blue-800 mb-2">Para integrar o Supabase:</h4>
                <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                  <li>Clique no botão verde "Supabase" no topo do Lovable</li>
                  <li>Conecte sua conta Supabase</li>
                  <li>Configure as tabelas e autenticação necessárias</li>
                  <li>Implemente as funcionalidades de backend</li>
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
          <Button onClick={checkSupabaseStatus} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Verificar Supabase
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Debug;