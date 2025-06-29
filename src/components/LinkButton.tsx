
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
      
      // Detecção melhorada de mobile - forçando para sempre tratar como mobile se tiver qualquer indicação
      const userAgent = navigator.userAgent.toLowerCase();
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isMobileUserAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i.test(userAgent);
      const isSmallScreen = window.innerWidth <= 768;
      
      // Se qualquer uma dessas condições for verdadeira, trata como mobile
      const isMobile = hasTouch || isMobileUserAgent || isSmallScreen;
      
      console.log('=== MOBILE DETECTION DEBUG ===');
      console.log('User Agent:', userAgent);
      console.log('Has touch:', hasTouch);
      console.log('Mobile UA detected:', isMobileUserAgent);
      console.log('Small screen:', isSmallScreen, 'Width:', window.innerWidth);
      console.log('Final mobile detection:', isMobile);
      console.log('===============================');
      
      // SEMPRE trata como mobile para PDF - mais simples e funciona melhor
      console.log('Treating as MOBILE for PDF - using direct approach');
      
      // Caminhos possíveis para o PDF
      const pdfPaths = [
        '/catalogo-gb-2024.pdf',
        './catalogo-gb-2024.pdf',
        `${window.location.origin}/catalogo-gb-2024.pdf`,
        `${window.location.origin}/public/catalogo-gb-2024.pdf`
      ];
      
      console.log('Trying PDF paths:', pdfPaths);
      
      let pdfOpened = false;
      
      // Tenta cada caminho até conseguir abrir
      for (let i = 0; i < pdfPaths.length && !pdfOpened; i++) {
        const pdfUrl = pdfPaths[i];
        console.log(`Attempt ${i + 1}: Opening PDF URL:`, pdfUrl);
        
        try {
          // Tenta window.open primeiro
          const opened = window.open(pdfUrl, '_blank', 'noopener,noreferrer');
          
          if (opened && !opened.closed) {
            console.log('✅ PDF opened successfully with window.open');
            pdfOpened = true;
            break;
          } else {
            console.log('❌ Window.open failed or was blocked');
          }
        } catch (error) {
          console.log('❌ Window.open threw error:', error);
        }
      }
      
      // Se nenhum caminho funcionou, tenta método alternativo
      if (!pdfOpened) {
        console.log('All paths failed, trying alternative download method...');
        
        const link = document.createElement('a');
        link.href = '/catalogo-gb-2024.pdf';
        link.target = '_blank';
        link.download = 'catalogo-gb-2024.pdf';
        link.rel = 'noopener noreferrer';
        
        // Adiciona ao DOM temporariamente
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('✅ Alternative download method executed');
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
