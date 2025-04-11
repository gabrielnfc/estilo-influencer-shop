
import { ShoppingCart, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { totalItems } = useCart();
  const [logoSrc, setLogoSrc] = useState("/lovable-uploads/ab795641-0b7b-4946-b1fc-cb5b0efe542d.png");

  if (!isAuthenticated) return null;

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-4 md:px-6 shadow-sm sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/store" className="flex items-center space-x-2">
          <img 
            src={logoSrc} 
            alt="Logo" 
            className="h-10 w-10" 
            onError={() => setLogoSrc("/placeholder.svg")}
          />
          <span className="font-medium text-xl">Influencer Store</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/checkout" className="relative">
            <Button variant="outline" size="icon" aria-label="Carrinho">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-magenta text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-sm font-medium">
                {user?.email}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="text-red-500 cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
