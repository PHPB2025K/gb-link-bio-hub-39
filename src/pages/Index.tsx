import React from 'react';
import { Globe, ShoppingCart, Package, ShoppingBag, BookOpen, Instagram, MessageCircle, FileText, Bug } from 'lucide-react';
import { Link } from 'react-router-dom';
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
      href: 'https://wa.me/5519992979180?text=Ol%C3%A1%20gostaria%20de%20fazer%20or%C3%A7amento%20por%20favor!',
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
      href: '/catalogo-gb-2024.pdf',
      icon: FileText,
      text: 'Catálogo Completo (PDF)',
      isPDF: true
    }
  ];

  const animationClasses = [
    'animate-smooth-slide-1',
    'animate-smooth-slide-2',
    'animate-smooth-slide-3',
    'animate-smooth-slide-4',
    'animate-smooth-slide-5',
    'animate-smooth-slide-6'
  ];

  const socialLinks = [
    {
      href: 'https://www.instagram.com/gb_importadora/',
      icon: Instagram,
      label: 'Instagram'
    },
    {
      href: 'https://wa.me/5519992979180?text=Ol%C3%A1%20gostaria%20de%20fazer%20or%C3%A7amento%20por%20favor!',
      icon: MessageCircle,
      label: 'WhatsApp'
    }
  ];

  return (
    <div className="min-h-screen bg-gb-gray">
      <div className="container mx-auto px-4 py-8 max-w-lg">
        {/* Header Section */}
        <header className="text-center mb-8">
          {/* Logo */}
          <div className="mb-6">
            <img
              src="/lovable-uploads/ee0f6b42-ae3f-4df3-ab7b-277d5f05ef1c.png"
              alt="GB Importadora - Logo oficial da empresa"
              className="w-36 h-auto mx-auto animate-smooth-slide-1 drop-shadow-sm"
              loading="eager"
              decoding="async"
            />
          </div>
          
          {/* Subtitle */}
          <h1 className="text-gb-green font-antonio text-lg font-semibold">
            Acesse nossos links oficiais!
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            Encontre nossos canais de venda e atendimento
          </p>
        </header>

        {/* Links Section */}
        <main className="space-y-3 mb-12">
          {links.map((link, index) => (
            <LinkButton
              key={`link-${index}-${link.text}`}
              href={link.href}
              icon={link.icon}
              text={link.text}
              animationClass={animationClasses[index]}
              isPDF={link.isPDF}
            />
          ))}
        </main>

        {/* Social Media Footer */}
        <footer className="flex flex-col items-center space-y-4 pt-8" role="contentinfo">
          <div className="flex items-center space-x-6">
            {socialLinks.map((social, index) => (
              <SocialIcon
                key={`social-${index}-${social.label}`}
                href={social.href}
                icon={social.icon}
                label={social.label}
                animationClass={`animate-smooth-slide-${index + 1}`}
              />
            ))}
          </div>
          
        </footer>
      </div>
    </div>
  );
};

export default Index;
