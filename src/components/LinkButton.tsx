
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
      
      // Melhor detecção de mobile - inclui mais dispositivos
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent) || 
                       ('ontouchstart' in window) || 
                       (navigator.maxTouchPoints > 0);
      
      console.log('Is mobile device:', isMobile);
      console.log('Touch support:', 'ontouchstart' in window);
      console.log('Max touch points:', navigator.maxTouchPoints);
      
      if (isMobile) {
        console.log('Mobile detected - using direct PDF approach');
        
        // Para mobile, primeiro tenta o caminho público
        const pdfPaths = [
          '/catalogo-gb-2024.pdf',
          './catalogo-gb-2024.pdf',
          `${window.location.origin}/catalogo-gb-2024.pdf`
        ];
        
        console.log('Trying PDF paths:', pdfPaths);
        
        // Tenta abrir diretamente o primeiro caminho
        const pdfUrl = pdfPaths[0];
        console.log('Opening PDF URL:', pdfUrl);
        
        // Para mobile, usa window.open sem verificação prévia
        const opened = window.open(pdfUrl, '_blank', 'noopener,noreferrer');
        
        if (!opened) {
          console.log('Window.open was blocked, trying alternative...');
          // Alternativa: criar elemento <a> e simular clique
          const link = document.createElement('a');
          link.href = pdfUrl;
          link.target = '_blank';
          link.download = 'catalogo-gb-2024.pdf';
          link.rel = 'noopener noreferrer';
          
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          console.log('Alternative download method used');
        } else {
          console.log('PDF opened successfully with window.open');
        }
        
      } else {
        console.log('Desktop detected - checking file availability first');
        
        fetch(href, { method: 'HEAD' })
          .then(response => {
            console.log('File check response:', response.status, response.ok);
            if (response.ok) {
              window.open(href, '_blank', 'noopener,noreferrer');
            } else {
              console.log('File not found, showing alert');
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
