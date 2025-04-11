
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  user: User | null;
}

interface User {
  name: string;
  email: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  // Simulate login functionality
  const login = async (email: string, password: string): Promise<boolean> => {
    // This is just a simulation - in a real app, this would validate against an API
    if (email && password) {
      setIsAuthenticated(true);
      setUser({
        name: 'Usuário',
        email: email
      });
      
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo à loja de influenciador.",
      });
      
      return true;
    }
    
    toast({
      title: "Erro de login",
      description: "Email ou senha inválidos.",
      variant: "destructive",
    });
    
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
