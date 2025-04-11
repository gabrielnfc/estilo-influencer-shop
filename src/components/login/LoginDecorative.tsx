
import React from "react";
import { Instagram, Twitter, Star } from "lucide-react";
import LoginLogo from "./LoginLogo";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const LoginDecorative = () => {
  const { theme } = useTheme();
  
  return (
    <div className={cn(
      "hidden md:flex md:w-1/2 p-8 justify-center items-center relative overflow-hidden",
      theme === "dark" 
        ? "bg-gradient-to-br from-background to-sidebar-background" 
        : "bg-gradient-to-br from-white to-gray-100"
    )}>
      {/* Background patterns - subtle animation */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated circles */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 400 + 100}px`,
              height: `${Math.random() * 400 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: i % 2 === 0 
                ? `linear-gradient(135deg, rgba(233,30,99,0.1), rgba(255,87,34,0.1))`
                : `linear-gradient(135deg, rgba(255,87,34,0.1), rgba(233,30,99,0.1))`,
              filter: 'blur(40px)',
              transform: `scale(${Math.random() + 0.5})`,
              animation: `pulse ${Math.random() * 10 + 10}s infinite alternate ease-in-out`,
            }}
          />
        ))}
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0" 
          style={{
            backgroundImage: theme === "dark" 
              ? 'linear-gradient(to right, rgba(233,30,99,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(233,30,99,0.05) 1px, transparent 1px)'
              : 'linear-gradient(to right, rgba(233,30,99,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(233,30,99,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} 
        />
      </div>
      
      <div className="z-10 max-w-md relative">
        <LoginLogo className="mb-8" />
        
        <h1 className={cn(
          "text-4xl font-bold mb-4",
          theme === "dark" ? "text-foreground" : "text-gray-800"
        )}>
          Bem-vindo(a) à sua<br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-magenta to-brand-orange animate-text">
            loja exclusiva
          </span>
        </h1>
        
        <p className={cn(
          "text-lg leading-relaxed",
          theme === "dark" ? "text-muted-foreground" : "text-gray-600"
        )}>
          Faça login para acessar uma experiência personalizada
          com produtos exclusivos selecionados especialmente para você.
        </p>
        
        {/* Feature highlights with social elements */}
        <div className="mt-10 grid grid-cols-2 gap-4">
          <FeatureItem 
            icon={<Star className="h-5 w-5 text-brand-magenta" />} 
            text="Produtos exclusivos" 
            bgClass="bg-brand-magenta/10" 
            theme={theme}
          />
          <FeatureItem 
            icon={<Instagram className="h-5 w-5 text-brand-orange" />} 
            text="Compartilhamento fácil" 
            bgClass="bg-brand-orange/10" 
            theme={theme}
          />
          <FeatureItem 
            icon={
              <svg className="h-5 w-5 text-brand-magenta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            } 
            text="Entrega expressa" 
            bgClass="bg-brand-magenta/10" 
            theme={theme}
          />
          <FeatureItem 
            icon={<Twitter className="h-5 w-5 text-brand-orange" />} 
            text="Visibilidade social" 
            bgClass="bg-brand-orange/10" 
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
};

type FeatureItemProps = {
  icon: React.ReactNode;
  text: string;
  bgClass: string;
  theme: string;
};

const FeatureItem = ({ icon, text, bgClass, theme }: FeatureItemProps) => (
  <div className="flex items-center space-x-2">
    <div className={`h-10 w-10 rounded-full ${bgClass} flex items-center justify-center`}>
      {icon}
    </div>
    <span className={theme === "dark" ? "text-muted-foreground" : "text-gray-700"}>{text}</span>
  </div>
);

export default LoginDecorative;
