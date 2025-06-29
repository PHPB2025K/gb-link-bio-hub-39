
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface LinkButtonProps {
  href: string;
  icon: LucideIcon;
  text: string;
  isPDF?: boolean;
}

const LinkButton: React.FC<LinkButtonProps> = ({ href, icon: Icon, text, isPDF = false }) => {
  const handleClick = () => {
    if (isPDF) {
      // Para PDFs, tenta abrir em nova aba
      const link = document.createElement('a');
      link.href = href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // Fallback para dispositivos que não conseguem abrir PDF no navegador
      link.onclick = (e) => {
        // Verifica se o arquivo existe antes de tentar abrir
        fetch(href, { method: 'HEAD' })
          .then(response => {
            if (!response.ok) {
              e.preventDefault();
              alert('Catálogo em breve! O arquivo PDF ainda não foi adicionado.');
            }
          })
          .catch(() => {
            e.preventDefault();
            alert('Catálogo em breve! O arquivo PDF ainda não foi adicionado.');
          });
      };
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full max-w-md mx-auto bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-3 h-16 flex items-center justify-between transition-all duration-200 hover:shadow-md hover:scale-[1.02] group"
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
