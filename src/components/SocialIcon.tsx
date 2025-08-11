
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SocialIconProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ href, icon: Icon, label }) => {
  const handleClick = () => {
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  const handleMouseEnter = () => {
    // Preconnect warmup on hover
    if (!document.querySelector(`link[href="${new URL(href).origin}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = new URL(href).origin;
      document.head.appendChild(link);
    }
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className="w-12 h-12 bg-gb-green hover:bg-gb-green-hover rounded-full flex items-center justify-center enhanced-button shadow-md hover:shadow-lg link-warmup"
      aria-label={`Abrir ${label} em nova aba`}
    >
      <Icon className="w-6 h-6 text-white" aria-hidden="true" />
    </button>
  );
};

export default SocialIcon;
