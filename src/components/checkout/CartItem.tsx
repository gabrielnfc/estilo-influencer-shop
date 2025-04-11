
import { Minus, Plus, X, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CartItem = ({ id, name, price, quantity, image }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { theme } = useTheme();
  
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
  
  const formattedTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price * quantity);

  return (
    <div className={cn(
      "flex items-center py-5 space-x-4 group px-2 -mx-2 transition-colors rounded-lg",
      theme === "dark" 
        ? "hover:bg-muted" 
        : "hover:bg-gray-50"
    )}>
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md relative">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center transition-transform group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
        <Badge 
          variant="secondary" 
          className={cn(
            "absolute bottom-0 right-0 backdrop-blur-sm text-xs border-0",
            theme === "dark" 
              ? "bg-card/80 text-foreground" 
              : "bg-white/80 text-gray-700"
          )}
        >
          {formattedPrice}
        </Badge>
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between">
          <h3 className={cn(
            "font-medium",
            theme === "dark" ? "text-foreground" : "text-gray-900"
          )}>{name}</h3>
          <button 
            onClick={() => removeFromCart(id)}
            className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
            aria-label="Remover item"
          >
            <Trash2 size={18} />
          </button>
        </div>
        
        <div className="mt-1 flex items-end justify-between">
          <div className={cn(
            "flex items-center rounded-lg border p-1",
            theme === "dark" 
              ? "bg-muted border-border" 
              : "bg-gray-50 border-gray-100"
          )}>
            <button
              onClick={() => updateQuantity(id, quantity - 1)}
              disabled={quantity <= 1}
              className={cn(
                "p-1 rounded-md transition-colors disabled:opacity-50",
                theme === "dark" 
                  ? "hover:bg-accent" 
                  : "hover:bg-gray-200"
              )}
              aria-label="Diminuir quantidade"
            >
              <Minus size={14} />
            </button>
            
            <span className={cn(
              "mx-3 w-5 text-center font-medium",
              theme === "dark" ? "text-foreground" : "text-gray-900"
            )}>{quantity}</span>
            
            <button
              onClick={() => updateQuantity(id, quantity + 1)}
              className={cn(
                "p-1 rounded-md transition-colors",
                theme === "dark" 
                  ? "hover:bg-accent" 
                  : "hover:bg-gray-200"
              )}
              aria-label="Aumentar quantidade"
            >
              <Plus size={14} />
            </button>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="text-brand-magenta font-bold">{formattedTotal}</div>
            {quantity > 1 && (
              <div className={cn(
                "text-xs",
                theme === "dark" ? "text-muted-foreground" : "text-gray-500"
              )}>
                {quantity}x {formattedPrice}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
