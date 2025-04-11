
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, ArrowRight, Mail, Lock } from "lucide-react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

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
          
          <SocialProof />
        </CardFooter>
      </form>
    </Card>
  );
};

const SocialProof = () => (
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
);

export default LoginForm;
