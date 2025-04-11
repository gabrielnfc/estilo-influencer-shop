
import { useCart } from "@/contexts/CartContext";

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
      <h2 className="text-lg font-medium text-gray-900 mb-4 border-b pb-4">Resumo do Pedido</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Itens:</span>
          <span>{totalQuantity}</span>
        </div>
        
        {cartItems.length > 0 && (
          <div className="pt-3 space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-500">
                  {item.name} x {item.quantity}
                </span>
                <span>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex justify-between font-medium text-lg">
            <span>Total:</span>
            <span className="text-brand-magenta">{formattedTotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
