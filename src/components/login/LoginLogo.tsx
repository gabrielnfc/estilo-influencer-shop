
import React from "react";

interface LoginLogoProps {
  className?: string;
}

const LoginLogo: React.FC<LoginLogoProps> = ({ className = "" }) => {
  return (
    <div className={className}>
      <div className="relative">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-brand-magenta/20 to-brand-orange/20 blur-md" />
        
        {/* Logo with glow effect */}
        <div className="relative p-4 bg-white rounded-2xl shadow-lg">
          <img 
            src="/lovable-uploads/ab795641-0b7b-4946-b1fc-cb5b0efe542d.png" 
            alt="Logo" 
            className="h-20 md:h-28 w-20 md:w-28 drop-shadow-lg" 
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginLogo;
