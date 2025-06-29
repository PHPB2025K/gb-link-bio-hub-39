import React from 'react';
import { Globe, ShoppingCart, Package, ShoppingBag, BookOpen, Instagram, MessageCircle } from 'lucide-react';
import LinkButton from '../components/LinkButton';
import SocialIcon from '../components/SocialIcon';

const Index = () => {
  const links = [
    {
      href: 'https://www.importadoragb.com.br/',
      icon: Globe,
      text: 'Site oficial (Institucional)'
    },
    {
      href: 'https://w.app/6cmcme',
      icon: ShoppingCart,
      text: 'Compras atacado (Somente CNPJ)'
    },
    {
      href: 'https://www.amazon.com.br/stores/page/43BDB010-7ECE-4194-842C-22343F77D712',
      icon: Package,
      text: 'Loja Oficial Amazon'
    },
    {
      href: 'https://www.mercadolivre.com.br/loja/budamix#from=share_eshop',
      icon: Package,
      text: 'Loja Oficial Mercado Livre'
    },
    {
      href: 'https://br.shp.ee/6xvXYu6',
      icon: Package,
      text: 'Loja Oficial Shopee'
    },
    {
      href: '#',
      icon: BookOpen,
      text: 'Catálogo Completo'
    }
  ];

  const animationClasses = [
    'animate-slide-in-bounce',
    'animate-slide-in-bounce-delay-1',
    'animate-slide-in-bounce-delay-2',
    'animate-slide-in-bounce-delay-3',
    'animate-slide-in-bounce-delay-4',
    'animate-slide-in-bounce-delay-5'
  ];

  const socialLinks = [
    {
      href: '#',
      icon: Instagram,
      label: 'Instagram'
    },
    {
      href: '#',
      icon: MessageCircle,
      label: 'WhatsApp'
    }
  ];

  return (
    <div className="min-h-screen bg-gb-gray">
      <div className="container mx-auto px-4 py-8 max-w-lg">
        {/* Header Section */}
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="mb-6">
            <img
              src="/lovable-uploads/ee0f6b42-ae3f-4df3-ab7b-277d5f05ef1c.png"
              alt="GB Importadora Logo"
              className="w-32 h-auto mx-auto"
            />
          </div>
          
          {/* Subtitle */}
          <p className="text-gb-green font-antonio text-lg">
            Acesse nossos links!
          </p>
        </div>

        {/* Links Section */}
        <div className="space-y-3 mb-12">
          {links.map((link, index) => (
            <LinkButton
              key={index}
              href={link.href}
              icon={link.icon}
              text={link.text}
              animationClass={animationClasses[index]}
            />
          ))}
        </div>

        {/* Social Media Footer */}
        <div className="flex justify-center space-x-6 pt-8">
          {socialLinks.map((social, index) => (
            <SocialIcon
              key={index}
              href={social.href}
              icon={social.icon}
              label={social.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
