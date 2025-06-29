
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
    console.log('LinkButton clicked:', { href, isPDF });
    
    if (isPDF) {
      console.log('PDF link clicked, opening:', href);
      
      // Para PDFs, tenta primeiro o caminho direto
      // Se não funcionar, tenta um download direto
      try {
        const pdfWindow = window.open(href, '_blank', 'noopener,noreferrer');
        
        // Se a janela não abriu (bloqueada), tenta método alternativo
        if (!pdfWindow || pdfWindow.closed) {
          console.log('Window blocked, trying direct download...');
          
          // Cria um link temporário para download
          const link = document.createElement('a');
          link.href = href;
          link.download = 'catalogo-gb-2024.pdf';
          link.target = '_blank';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } catch (error) {
        console.error('Error opening PDF:', error);
        
        // Fallback: tenta navegar diretamente
        window.location.href = href;
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
