
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface LinkButtonProps {
  href: string;
  icon: LucideIcon;
  text: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ href, icon: Icon, text }) => {
  const handleClick = () => {
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className="w-full max-w-md mx-auto bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl p-4 flex items-center justify-between transition-all duration-200 hover:shadow-md hover:scale-[1.02] group"
    >
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gb-green rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className="text-gray-700 font-medium text-left flex-1 group-hover:text-gb-green transition-colors">
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
