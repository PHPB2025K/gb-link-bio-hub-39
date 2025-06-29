
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
      console.log('PDF link clicked, attempting to open:', href);
      
      // Detecta se é mobile
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      console.log('Is mobile device:', isMobile);
      
      if (isMobile) {
        console.log('Mobile detected - trying direct approach');
        
        // Para mobile, usa abordagem mais direta
        const fullUrl = window.location.origin + href;
        console.log('Full PDF URL:', fullUrl);
        
        // Tenta abrir diretamente
        const opened = window.open(fullUrl, '_blank', 'noopener,noreferrer');
        console.log('Window.open result:', opened);
        
        if (!opened) {
          console.log('Window.open blocked, trying alternative method');
          // Fallback: criar link temporário
          const tempLink = document.createElement('a');
          tempLink.href = fullUrl;
          tempLink.target = '_blank';
          tempLink.rel = 'noopener noreferrer';
          
          // Adiciona temporariamente ao DOM
          tempLink.style.display = 'none';
          document.body.appendChild(tempLink);
          
          // Clica no link
          tempLink.click();
          
          // Remove do DOM
          setTimeout(() => {
            document.body.removeChild(tempLink);
          }, 100);
          
          console.log('Alternative method attempted');
        }
      } else {
        // Para desktop, mantém a verificação
        console.log('Desktop detected - checking file availability');
        
        fetch(href, { method: 'HEAD' })
          .then(response => {
            console.log('File check response:', response.status, response.ok);
            if (response.ok) {
              window.open(href, '_blank', 'noopener,noreferrer');
            } else {
              alert('Catálogo em breve! O arquivo PDF ainda não foi adicionado.');
            }
          })
          .catch((error) => {
            console.error('File check failed:', error);
            alert('Catálogo em breve! O arquivo PDF ainda não foi adicionado.');
          });
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
