
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
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
      {/* Left decorative section - only visible on md screens and above */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-brand-magenta to-brand-orange p-8 justify-center items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10">
          {/* Decorative patterns */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                background: `rgba(255,255,255,${Math.random() * 0.3})`,
                transform: `scale(${Math.random() + 0.5})`,
              }}
            />
          ))}
        </div>
        <div className="z-10 text-white max-w-md">
          <div className="mb-6">
            <img 
              src="/lovable-uploads/ab795641-0b7b-4946-b1fc-cb5b0efe542d.png" 
              alt="Logo" 
              className="h-24 w-24 animate-fade-in" 
            />
          </div>
          <h1 className="text-4xl font-bold mb-4">Bem-vindo(a) à sua loja exclusiva</h1>
          <p className="text-lg opacity-90">
            Acesse sua área privada para gerenciar seus pedidos e produtos exclusivos.
          </p>
        </div>
      </div>

      {/* Login form section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          {/* Logo - only visible on mobile */}
          <div className="flex justify-center mb-8 md:hidden">
            <img 
              src="/lovable-uploads/ab795641-0b7b-4946-b1fc-cb5b0efe542d.png" 
              alt="Logo" 
              className="h-16 w-16" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
          </div>
          
          <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center font-bold bg-gradient-to-r from-brand-magenta to-brand-orange bg-clip-text text-transparent">
                Bem-vindo(a)
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                Faça login para acessar a loja de influenciador
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label 
                    htmlFor="email" 
                    className="font-medium text-gray-700 flex items-center gap-2"
                  >
                    <Mail size={16} className="text-brand-magenta" />
                    E-mail
                  </Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-3 pr-3 py-2 h-12 rounded-xl border-gray-200 focus-visible:ring-brand-magenta"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label 
                      htmlFor="password" 
                      className="font-medium text-gray-700 flex items-center gap-2"
                    >
                      <Lock size={16} className="text-brand-magenta" />
                      Senha
                    </Label>
                    <a 
                      href="#" 
                      className="text-sm font-medium text-brand-magenta hover:text-brand-orange transition-colors"
                    >
                      Esqueceu a senha?
                    </a>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-3 pr-10 py-2 h-12 rounded-xl border-gray-200 focus-visible:ring-brand-magenta"
                    />
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col gap-4">
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base rounded-xl bg-gradient-to-r from-brand-magenta to-brand-orange hover:from-brand-magenta/90 hover:to-brand-orange/90 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                  disabled={isLoading}
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
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
