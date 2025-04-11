
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag, CreditCard, Tag } from "lucide-react";

interface OrderSummaryProps {
  className?: string;
}

const OrderSummary = ({ className }: OrderSummaryProps) => {
  const { cartItems, totalPrice } = useCart();
  
  const formattedTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(totalPrice);
  
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${className || ''}`}>
      <div className="flex items-center gap-2 mb-4 border-b pb-4">
        <ShoppingBag className="text-brand-magenta" size={18} />
        <h2 className="text-lg font-medium text-gray-900">Resumo do Pedido</h2>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Tag size={16} className="text-gray-400" />
            <span className="text-gray-600">Itens:</span>
          </div>
          <span className="font-medium">{totalQuantity}</span>
        </div>
        
        {cartItems.length > 0 && (
          <div className="pt-3 space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <div className="flex-1 truncate pr-4">
                  <span className="text-gray-700 font-medium">
                    {item.name} 
                  </span>
                  <span className="text-gray-500 ml-1">
                    x {item.quantity}
                  </span>
                </div>
                <span className="text-gray-900">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex justify-between items-center font-medium text-lg">
            <div className="flex items-center gap-2">
              <CreditCard size={18} className="text-brand-magenta" />
              <span>Total:</span>
            </div>
            <span className="text-brand-magenta">{formattedTotal}</span>
          </div>
          
          <p className="text-xs text-gray-500 mt-2 text-center">
            Pagamento seguro processado na entrega
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
