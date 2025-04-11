
import { ShoppingCart, LogOut, User, Heart, Bell } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { totalItems, totalPrice } = useCart();
  const { favorites } = useFavorites();
  const [logoSrc, setLogoSrc] = useState("/lovable-uploads/ab795641-0b7b-4946-b1fc-cb5b0efe542d.png");

  if (!isAuthenticated) return null;

  const formattedTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(totalPrice);

  return (
    <header className="bg-white border-b border-gray-100 py-3 px-4 md:px-6 shadow-sm sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/store" className="flex items-center space-x-2">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-brand-magenta/20 to-brand-orange/20 blur-sm"></div>
            <div className="relative">
              <img 
                src={logoSrc} 
                alt="Logo" 
                className="h-8 w-8 rounded-full" 
                onError={() => setLogoSrc("/placeholder.svg")}
              />
            </div>
          </div>
          <span className="font-medium text-xl bg-gradient-to-r from-brand-magenta to-brand-orange bg-clip-text text-transparent hidden sm:inline-block">
            Influencer Store
          </span>
        </Link>
        
        <div className="flex items-center space-x-1 sm:space-x-3">
          <Link to="/favorites">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`relative ${favorites.length > 0 ? 'text-brand-magenta' : 'text-gray-600'}`} 
              aria-label="Favoritos"
            >
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-magenta text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Button>
          </Link>
          
          <Button variant="ghost" size="icon" className="text-gray-600" aria-label="Notificações">
            <Bell className="h-5 w-5" />
          </Button>
          
          <Link to="/checkout" className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`relative ${totalItems > 0 ? 'text-brand-magenta' : 'text-gray-600'}`} 
              aria-label="Carrinho"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-magenta text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
            
            {/* Cart price preview */}
            {totalItems > 0 && (
              <div className="hidden sm:block absolute top-full right-0 mt-1 bg-white rounded-md py-1 px-2 text-xs font-medium text-brand-magenta border border-gray-100 shadow-sm">
                {formattedTotal}
              </div>
            )}
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full bg-gray-50">
                <User className="h-5 w-5 text-gray-700" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-sm">
                {user?.email}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
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
