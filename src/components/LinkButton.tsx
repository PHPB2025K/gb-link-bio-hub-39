
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface LinkButtonProps {
  href: string;
  icon: LucideIcon;
  text: string;
  animationClass?: string;
  isPDF?: boolean;
}

const LinkButton: React.FC<LinkButtonProps> = ({ href, icon: Icon, text, animationClass = '', isPDF = false }) => {
  const handleClick = () => {
    console.log('LinkButton clicked:', { href, isPDF, userAgent: navigator.userAgent });
    
    if (isPDF) {
      console.log('Attempting to open PDF:', href);
      
      // Detecta se é mobile
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      console.log('Is mobile device:', isMobile);
      
      if (isMobile) {
        // Para mobile, tenta várias abordagens
        console.log('Using mobile PDF handling');
        
        // Primeira tentativa: abrir diretamente
        try {
          window.open(href, '_blank');
          console.log('Mobile: window.open attempted');
        } catch (error) {
          console.error('Mobile: window.open failed', error);
          
          // Fallback: criar link e clicar
          const link = document.createElement('a');
          link.href = href;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.download = 'catalogo-gb-2024.pdf'; // Força download em alguns casos
          
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          console.log('Mobile: fallback link click attempted');
        }
      } else {
        // Para desktop, mantém a lógica original com verificação
        const link = document.createElement('a');
        link.href = href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        
        link.onclick = (e) => {
          console.log('Desktop: checking PDF availability');
          fetch(href, { method: 'HEAD' })
            .then(response => {
              console.log('PDF check response:', response.status, response.ok);
              if (!response.ok) {
                e.preventDefault();
                alert('Catálogo em breve! O arquivo PDF ainda não foi adicionado.');
              }
            })
            .catch((error) => {
              console.error('PDF check failed:', error);
              e.preventDefault();
              alert('Catálogo em breve! O arquivo PDF ainda não foi adicionado.');
            });
        };
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log('Desktop: link creation and click attempted');
      }
    } else {
      console.log('Opening regular link:', href);
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full max-w-md mx-auto bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-3 h-16 flex items-center justify-between transition-all duration-200 hover:shadow-md hover:scale-[1.02] group ${animationClass}`}
    >
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 ${isPDF ? 'bg-red-500' : 'bg-gb-green'} rounded-lg flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <span className="text-gray-700 font-medium text-left flex-1 group-hover:text-gb-green transition-colors text-sm">
          {text}
        </span>
      </div>
      <div className="flex items-center space-x-1 text-gray-400">
        <div className="w-1 h-1 bg-current rounded-full"></div>
        <div className="w-1 h-1 bg-current rounded-full"></div>
        <div className="w-1 h-1 bg-current rounded-full"></div>
      </div>
    </button>
  );
};

export default LinkButton;
