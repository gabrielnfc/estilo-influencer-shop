
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CartItem = ({ id, name, price, quantity, image }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();
  
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price);
  
  const formattedTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price * quantity);

  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
      </div>
      
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between">
          <h3 className="font-medium text-gray-900">{name}</h3>
          <button 
            onClick={() => removeFromCart(id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="mt-1 flex justify-between">
          <div className="text-gray-500">{formattedPrice}</div>
          <div className="text-gray-900 font-medium">{formattedTotal}</div>
        </div>
        
        <div className="mt-2 flex items-center">
          <button
            onClick={() => updateQuantity(id, quantity - 1)}
            className="p-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Minus size={14} />
          </button>
          
          <span className="mx-2 w-8 text-center">{quantity}</span>
          
          <button
            onClick={() => updateQuantity(id, quantity + 1)}
            className="p-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
