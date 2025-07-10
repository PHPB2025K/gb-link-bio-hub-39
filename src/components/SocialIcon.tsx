
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
      className={`w-12 h-12 bg-gb-green hover:bg-gb-green/80 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 ${animationClass || ''}`}
      aria-label={label}
    >
      <Icon className="w-6 h-6 text-white" />
    </button>
  );
};

export default SocialIcon;
