
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import LoginLogo from "@/components/login/LoginLogo";
import LoginDecorative from "@/components/login/LoginDecorative";
import LoginForm from "@/components/login/LoginForm";

const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  if (isAuthenticated) {
    navigate("/store", { replace: true });
  }

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white">
      {/* Left decorative section - only visible on md screens and above */}
      <LoginDecorative />

      {/* Login form section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md">
          {/* Logo - only visible on mobile */}
          <div className="flex justify-center mb-8 md:hidden">
            <LoginLogo />
          </div>
          
          <LoginForm />
          
          <p className="text-center text-gray-500 text-sm mt-6">
            Esta é uma loja privada apenas para convidados
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
