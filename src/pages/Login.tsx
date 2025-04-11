
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import LoginLogo from "@/components/login/LoginLogo";
import LoginDecorative from "@/components/login/LoginDecorative";
import LoginForm from "@/components/login/LoginForm";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  if (isAuthenticated) {
    navigate("/store", { replace: true });
  }

  return (
    <div className={cn(
      "min-h-screen w-full flex flex-col md:flex-row",
      theme === "dark" ? "bg-background text-foreground" : "bg-white"
    )}>
      {/* Left decorative section - only visible on md screens and above */}
      <LoginDecorative />

      {/* Login form section */}
      <div className={cn(
        "w-full md:w-1/2 flex items-center justify-center p-6 md:p-12",
        theme === "dark" ? "bg-background" : "bg-white"
      )}>
        <div className="w-full max-w-md">
          {/* Logo - only visible on mobile */}
          <div className="flex justify-center mb-8 md:hidden">
            <LoginLogo />
          </div>
          
          <LoginForm />
          
          <p className={cn(
            "text-center text-sm mt-6",
            theme === "dark" ? "text-muted-foreground" : "text-gray-500"
          )}>
            Esta é uma loja privada apenas para convidados
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
