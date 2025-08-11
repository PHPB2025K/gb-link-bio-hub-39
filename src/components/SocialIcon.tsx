
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SocialIconProps {
  href: string;
  icon: LucideIcon;
  label: string;
  animationClass?: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ href, icon: Icon, label, animationClass }) => {
  const handleClick = () => {
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className={`w-12 h-12 bg-gb-green hover:bg-gb-green-hover rounded-full flex items-center justify-center enhanced-button shadow-md hover:shadow-lg ${animationClass || ''}`}
      aria-label={`Abrir ${label} em nova aba`}
    >
      <Icon className="w-6 h-6 text-white" aria-hidden="true" />
    </button>
  );
};

export default SocialIcon;
