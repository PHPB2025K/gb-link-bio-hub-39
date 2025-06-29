
import React, { useState } from 'react';
import { Globe, ShoppingCart, Package, BookOpen } from 'lucide-react';

const AnimationTester = () => {
  const [selectedAnimation, setSelectedAnimation] = useState('slide-bounce');
  
  const animationOptions = {
    'slide-bounce': ['animate-slide-bounce-1', 'animate-slide-bounce-2', 'animate-slide-bounce-3', 'animate-slide-bounce-4', 'animate-slide-bounce-5', 'animate-slide-bounce-6'],
    'smooth-slide': ['animate-smooth-slide-1', 'animate-smooth-slide-2', 'animate-smooth-slide-3', 'animate-smooth-slide-4', 'animate-smooth-slide-5', 'animate-smooth-slide-6'],
    'fade-scale': ['animate-fade-scale-1', 'animate-fade-scale-2', 'animate-fade-scale-3', 'animate-fade-scale-4', 'animate-fade-scale-5', 'animate-fade-scale-6'],
    'diagonal': ['animate-diagonal-1', 'animate-diagonal-2', 'animate-diagonal-3', 'animate-diagonal-4', 'animate-diagonal-5', 'animate-diagonal-6'],
    'wave': ['animate-wave-1', 'animate-wave-2', 'animate-wave-3', 'animate-wave-4', 'animate-wave-5', 'animate-wave-6'],
    'flip': ['animate-flip-1', 'animate-flip-2', 'animate-flip-3', 'animate-flip-4', 'animate-flip-5', 'animate-flip-6'],
    'elastic': ['animate-elastic-1', 'animate-elastic-2', 'animate-elastic-3', 'animate-elastic-4', 'animate-elastic-5', 'animate-elastic-6']
  };

  const links = [
    { icon: Globe, text: 'Site oficial (Institucional)' },
    { icon: ShoppingCart, text: 'Compras atacado (Somente CNPJ)' },
    { icon: Package, text: 'Loja Oficial Amazon' },
    { icon: Package, text: 'Loja Oficial Mercado Livre' },
    { icon: Package, text: 'Loja Oficial Shopee' },
    { icon: BookOpen, text: 'Catálogo Completo' }
  ];

  return (
    <div className="min-h-screen bg-gb-gray p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-antonio text-gb-green mb-6 text-center">
          Teste de Animações
        </h1>
        
        {/* Seletor de Animação */}
        <div className="mb-8 p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-gb-green">Escolha o estilo de animação:</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(animationOptions).map((option) => (
              <button
                key={option}
                onClick={() => setSelectedAnimation(option)}
                className={`p-2 rounded-md text-sm font-medium transition-colors ${
                  selectedAnimation === option
                    ? 'bg-gb-green text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Preview das Animações */}
        <div className="space-y-3">
          {links.map((link, index) => {
            const Icon = link.icon;
            const animationClass = animationOptions[selectedAnimation as keyof typeof animationOptions][index];
            
            return (
              <div
                key={`${selectedAnimation}-${index}`}
                className={`w-full max-w-md mx-auto bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-3 h-16 flex items-center justify-between transition-all duration-200 hover:shadow-md hover:scale-[1.02] group ${animationClass}`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gb-green rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium text-left flex-1 group-hover:text-gb-green transition-colors text-sm">
                    {link.text}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-gray-400">
                  <div className="w-1 h-1 bg-current rounded-full"></div>
                  <div className="w-1 h-1 bg-current rounded-full"></div>
                  <div className="w-1 h-1 bg-current rounded-full"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Descrições das Animações */}
        <div className="mt-8 p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-gb-green">Descrição das Animações:</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>Slide Bounce:</strong> Desliza da direita com um bounce suave no final</p>
            <p><strong>Smooth Slide:</strong> Deslizamento mais lento e suave, ideal para um efeito elegante</p>
            <p><strong>Fade Scale:</strong> Aparece com fade e um leve efeito de escala</p>
            <p><strong>Diagonal:</strong> Entra na diagonal com uma leve rotação</p>
            <p><strong>Wave:</strong> Efeito de ondulação com skew</p>
            <p><strong>Flip:</strong> Efeito de flip 3D combinado com slide</p>
            <p><strong>Elastic:</strong> Bounce elástico mais pronunciado</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationTester;
