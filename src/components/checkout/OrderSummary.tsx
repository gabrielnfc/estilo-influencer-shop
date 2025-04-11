
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag, CreditCard, Tag, Truck, Calculator } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

interface OrderSummaryProps {
  className?: string;
}

const OrderSummary = ({ className }: OrderSummaryProps) => {
  const { cartItems, totalPrice } = useCart();
  const { theme } = useTheme();
  
  const formattedTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(totalPrice);
  
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={cn(
      "rounded-xl shadow-sm p-6 border",
      theme === "dark" 
        ? "bg-card border-border" 
        : "bg-white border-gray-100",
      className 
    )}>
      <div className="flex items-center gap-2 mb-4">
        <div className="h-8 w-8 rounded-full bg-brand-magenta/10 flex items-center justify-center">
          <ShoppingBag size={16} className="text-brand-magenta" />
        </div>
        <h2 className="text-lg font-bold bg-gradient-to-r from-brand-magenta to-brand-orange bg-clip-text text-transparent">
          Resumo do Pedido
        </h2>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Tag size={16} className={theme === "dark" ? "text-gray-400" : "text-gray-400"} />
            <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>Itens:</span>
          </div>
          <span className="font-medium">{totalQuantity}</span>
        </div>
        
        {cartItems.length > 0 && (
          <div className="pt-3 space-y-3 max-h-40 overflow-y-auto pr-2 scrollbar-thin">
            {cartItems.map((item) => (
              <div key={item.id} className={cn(
                "flex justify-between text-sm pb-2 border-b border-dashed",
                theme === "dark" ? "border-border/50" : "border-gray-100"
              )}>
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "h-6 w-6 rounded-md overflow-hidden flex-shrink-0",
                    theme === "dark" ? "bg-muted" : "bg-gray-100"
                  )}>
                    <img
                      src={item.image}
                      alt=""
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                  </div>
                  <span className={cn(
                    "font-medium truncate max-w-[120px]",
                    theme === "dark" ? "text-foreground" : "text-gray-700"
                  )}>
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className={theme === "dark" ? "text-xs text-muted-foreground" : "text-xs text-gray-500"}>
                    {item.quantity}x
                  </span>
                  <span className={theme === "dark" ? "text-foreground" : "text-gray-900"}>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(item.price)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <Separator className={cn(
          "my-3",
          theme === "dark" ? "bg-border" : ""
        )} />
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <Calculator size={14} className={theme === "dark" ? "text-gray-400" : "text-gray-400"} />
              <span className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>Subtotal:</span>
            </div>
            <span className={theme === "dark" ? "text-foreground" : "text-gray-700"}>{formattedTotal}</span>
          </div>
          
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2">
              <Truck size={14} className={theme === "dark" ? "text-gray-400" : "text-gray-400"} />
              <span className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>Entrega:</span>
            </div>
            <span className="text-green-500 font-medium">Grátis</span>
          </div>
        </div>
        
        <div className={cn(
          "mt-4 pt-4 border-t",
          theme === "dark" ? "border-border" : "border-gray-100"
        )}>
          <div className="flex justify-between items-center font-medium text-lg">
            <div className="flex items-center gap-2">
              <CreditCard size={18} className="text-brand-magenta" />
              <span>Total:</span>
            </div>
            <span className="text-brand-magenta font-bold">{formattedTotal}</span>
          </div>
          
          <div className={cn(
            "mt-3 p-2 rounded-lg border",
            theme === "dark" 
              ? "bg-muted border-border" 
              : "bg-gray-50 border-gray-100"
          )}>
            <p className={cn(
              "text-xs text-center flex items-center justify-center gap-1",
              theme === "dark" ? "text-muted-foreground" : "text-gray-500"
            )}>
              <CreditCard size={12} className={theme === "dark" ? "text-gray-400" : "text-gray-400"} />
              Pagamento seguro processado na entrega
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
