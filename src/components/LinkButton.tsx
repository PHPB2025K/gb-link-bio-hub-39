
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
    if (isPDF) {
      // Para PDFs, abre em nova aba
      try {
        window.open(href, '_blank', 'noopener,noreferrer');
      } catch (error) {
        // Fallback: navega diretamente
        window.location.href = href;
      }
    } else {
      // Para links externos, abre em nova aba
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full max-w-md mx-auto bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-3 h-16 flex items-center justify-between enhanced-button group shadow-sm hover:shadow-lg ${animationClass}`}
      aria-label={`${text} - ${isPDF ? 'Abrir PDF' : 'Abrir link externo'}`}
    >
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <div className={`w-10 h-10 ${isPDF ? 'bg-destructive' : 'bg-gb-green'} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
          <Icon className="w-5 h-5 text-white" aria-hidden="true" />
        </div>
        <span className="text-foreground font-medium text-left flex-1 group-hover:text-gb-green smooth-transition text-sm truncate">
          {text}
        </span>
      </div>
      <div className="flex items-center space-x-1 text-muted-foreground group-hover:text-gb-green smooth-transition" aria-hidden="true">
        <div className="w-1 h-1 bg-current rounded-full"></div>
        <div className="w-1 h-1 bg-current rounded-full"></div>
        <div className="w-1 h-1 bg-current rounded-full"></div>
      </div>
    </button>
  );
};

export default LinkButton;
