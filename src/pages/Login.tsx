
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, ArrowRight, Mail, Lock } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  if (isAuthenticated) {
    navigate("/store", { replace: true });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        navigate("/store");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#0F172A]">
      {/* Left decorative section - only visible on md screens and above */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#0F172A] to-[#0F172A] p-8 justify-center items-center relative overflow-hidden">
        {/* Background patterns - subtle animation */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated circles */}
          {Array.from({ length: 10 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full opacity-10"
              style={{
                width: `${Math.random() * 400 + 100}px`,
                height: `${Math.random() * 400 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                background: `rgba(255,87,34,${Math.random() * 0.15})`,
                filter: 'blur(40px)',
                transform: `scale(${Math.random() + 0.5})`,
                animation: `pulse ${Math.random() * 10 + 10}s infinite alternate ease-in-out`,
              }}
            />
          ))}
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-grid-white/[0.02]" 
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} 
          />
        </div>
        
        <div className="z-10 text-white max-w-md relative">
          <div className="mb-8 relative">
            {/* Spotlight effect behind logo */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-600/30 to-orange-400/30 blur-xl" />
            
            {/* Logo with glow effect */}
            <div className="relative p-2 bg-white bg-opacity-10 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.37)]">
              <img 
                src="/lovable-uploads/ab795641-0b7b-4946-b1fc-cb5b0efe542d.png" 
                alt="Logo" 
                className="h-28 w-28 animate-fade-in drop-shadow-[0_0_15px_rgba(233,30,99,0.5)]" 
              />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-brand-magenta via-white to-brand-orange animate-text">
            Bem-vindo(a) à sua<br />loja exclusiva
          </h1>
          
          <p className="text-lg text-gray-300 leading-relaxed">
            Faça login para acessar uma experiência personalizada
            com produtos exclusivos selecionados especialmente para você.
          </p>
          
          {/* Feature highlights */}
          <div className="mt-12 grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-brand-magenta/20 flex items-center justify-center">
                <svg className="h-4 w-4 text-brand-magenta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-gray-300 text-sm">Produtos exclusivos</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-brand-orange/20 flex items-center justify-center">
                <svg className="h-4 w-4 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-gray-300 text-sm">Entrega rápida</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-brand-magenta/20 flex items-center justify-center">
                <svg className="h-4 w-4 text-brand-magenta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="text-gray-300 text-sm">Acesso seguro</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-brand-orange/20 flex items-center justify-center">
                <svg className="h-4 w-4 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-gray-300 text-sm">Atendimento VIP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Login form section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-8 bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
        <div className="w-full max-w-md">
          {/* Logo - only visible on mobile */}
          <div className="flex justify-center mb-8 md:hidden">
            {/* Spotlight effect behind logo */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-pink-600/30 to-orange-400/30 blur-xl" />
              
              {/* Logo with glow effect */}
              <div className="relative p-2 bg-white bg-opacity-10 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.37)]">
                <img 
                  src="/lovable-uploads/ab795641-0b7b-4946-b1fc-cb5b0efe542d.png" 
                  alt="Logo" 
                  className="h-20 w-20 animate-fade-in drop-shadow-[0_0_15px_rgba(233,30,99,0.5)]" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
              </div>
            </div>
          </div>
          
          <Card className="border-none shadow-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <CardHeader className="space-y-1 pb-2">
              <CardTitle className="text-2xl text-center font-bold text-white">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-magenta to-brand-orange">
                  Bem-vindo(a)
                </span>
              </CardTitle>
              <CardDescription className="text-center text-gray-400">
                Faça login para acessar a loja exclusiva
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label 
                    htmlFor="email" 
                    className="font-medium text-gray-300 flex items-center gap-2"
                  >
                    <Mail size={16} className="text-brand-magenta" />
                    E-mail
                  </Label>
                  <div className="relative group">
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-3 pr-3 py-2 h-12 rounded-xl bg-white/10 border-gray-700 focus-visible:ring-brand-magenta text-white placeholder:text-gray-500 transition-all"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-magenta/20 to-brand-orange/20 opacity-0 group-hover:opacity-100 -z-10 blur-sm transition-opacity"></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label 
                      htmlFor="password" 
                      className="font-medium text-gray-300 flex items-center gap-2"
                    >
                      <Lock size={16} className="text-brand-magenta" />
                      Senha
                    </Label>
                    <a 
                      href="#" 
                      className="text-sm font-medium text-brand-magenta hover:text-brand-orange transition-colors"
                    >
                      Esqueceu?
                    </a>
                  </div>
                  <div className="relative group">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-3 pr-10 py-2 h-12 rounded-xl bg-white/10 border-gray-700 focus-visible:ring-brand-magenta text-white placeholder:text-gray-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-magenta/20 to-brand-orange/20 opacity-0 group-hover:opacity-100 -z-10 blur-sm transition-opacity"></div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col gap-4 pt-2 pb-6">
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-sm shadow-[0_0_20px_rgba(233,30,99,0.3)] hover:shadow-[0_0_25px_rgba(233,30,99,0.5)] transition-all duration-300 relative overflow-hidden group"
                  disabled={isLoading}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-brand-magenta to-brand-orange opacity-80 z-0 transition-opacity group-hover:opacity-100"></span>
                  <span className="relative z-10 flex items-center justify-center gap-2 font-semibold text-white">
                    {isLoading ? "Entrando..." : "Entrar"}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          <p className="text-center text-gray-500 text-sm mt-6">
            Esta é uma loja privada apenas para convidados
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
