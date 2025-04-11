
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, ArrowRight, Mail, Lock, Instagram, Twitter, Star } from "lucide-react";

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
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white">
      {/* Left decorative section - only visible on md screens and above */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-white to-gray-100 p-8 justify-center items-center relative overflow-hidden">
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
              backgroundImage: 'linear-gradient(to right, rgba(233,30,99,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(233,30,99,0.03) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} 
          />
        </div>
        
        <div className="z-10 max-w-md relative">
          <div className="mb-8 relative">
            {/* Spotlight effect behind logo */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-brand-magenta/20 to-brand-orange/20 blur-md" />
            
            {/* Logo with glow effect */}
            <div className="relative p-4 bg-white rounded-2xl shadow-lg">
              <img 
                src="/lovable-uploads/ab795641-0b7b-4946-b1fc-cb5b0efe542d.png" 
                alt="Logo" 
                className="h-28 w-28 drop-shadow-lg" 
              />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Bem-vindo(a) à sua<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-magenta to-brand-orange animate-text">
              loja exclusiva
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 leading-relaxed">
            Faça login para acessar uma experiência personalizada
            com produtos exclusivos selecionados especialmente para você.
          </p>
          
          {/* Feature highlights with social elements */}
          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-brand-magenta/10 flex items-center justify-center">
                <Star className="h-5 w-5 text-brand-magenta" />
              </div>
              <span className="text-gray-700">Produtos exclusivos</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-brand-orange/10 flex items-center justify-center">
                <Instagram className="h-5 w-5 text-brand-orange" />
              </div>
              <span className="text-gray-700">Compartilhamento fácil</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-brand-magenta/10 flex items-center justify-center">
                <svg className="h-5 w-5 text-brand-magenta" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-gray-700">Entrega expressa</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-brand-orange/10 flex items-center justify-center">
                <Twitter className="h-5 w-5 text-brand-orange" />
              </div>
              <span className="text-gray-700">Visibilidade social</span>
            </div>
          </div>
        </div>
      </div>

      {/* Login form section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md">
          {/* Logo - only visible on mobile */}
          <div className="flex justify-center mb-8 md:hidden">
            {/* Spotlight effect behind logo */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-brand-magenta/20 to-brand-orange/20 blur-md" />
              
              {/* Logo with glow effect */}
              <div className="relative p-4 bg-white rounded-2xl shadow-lg">
                <img 
                  src="/lovable-uploads/ab795641-0b7b-4946-b1fc-cb5b0efe542d.png" 
                  alt="Logo" 
                  className="h-20 w-20 drop-shadow-lg" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
              </div>
            </div>
          </div>
          
          <Card className="shadow-lg border border-gray-100">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl text-center font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-magenta to-brand-orange">
                  Bem-vindo(a)
                </span>
              </CardTitle>
              <CardDescription className="text-center text-gray-500">
                Faça login para acessar a loja exclusiva
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 pt-2">
                <div className="space-y-2">
                  <Label 
                    htmlFor="email" 
                    className="font-medium text-gray-700 flex items-center gap-2"
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
                      className="pl-3 pr-3 py-2 h-12 rounded-xl border border-gray-200 focus-visible:ring-brand-magenta transition-all"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-magenta/10 to-brand-orange/10 opacity-0 group-hover:opacity-100 -z-10 blur-sm transition-opacity"></div>
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
                      className="pl-3 pr-10 py-2 h-12 rounded-xl border border-gray-200 focus-visible:ring-brand-magenta transition-all"
                    />
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-magenta/10 to-brand-orange/10 opacity-0 group-hover:opacity-100 -z-10 blur-sm transition-opacity"></div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col gap-4 pt-2 pb-6">
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base rounded-xl shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                  disabled={isLoading}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-brand-magenta to-brand-orange opacity-90 z-0 transition-opacity group-hover:opacity-100"></span>
                  <span className="relative z-10 flex items-center justify-center gap-2 font-semibold text-white">
                    {isLoading ? "Entrando..." : "Entrar"}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </Button>
                
                {/* Social proof element */}
                <div className="flex items-center justify-center text-gray-500 text-sm mt-2">
                  <span className="flex items-center">
                    <span className="inline-flex -space-x-2 overflow-hidden">
                      {[1, 2, 3].map((i) => (
                        <div 
                          key={i}
                          className={`inline-block h-8 w-8 rounded-full ring-2 ring-white ${
                            i % 3 === 0 ? 'bg-brand-magenta/20' : 
                            i % 3 === 1 ? 'bg-brand-orange/20' : 'bg-purple-200'
                          }`}
                        >
                          <span className="sr-only">User {i}</span>
                        </div>
                      ))}
                    </span>
                    <span className="ml-4">+240 criadores já conectados</span>
                  </span>
                </div>
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
