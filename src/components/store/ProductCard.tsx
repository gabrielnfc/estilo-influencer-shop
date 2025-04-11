
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product, useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(product.price);

  return (
    <div 
      className="bg-white rounded-xl shadow-sm overflow-hidden card-hover-effect"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-900 text-lg mb-1 truncate">{product.name}</h3>
        <div className="text-sm text-gray-500 mb-3">{product.category}</div>
        
        <div className="flex items-center justify-between">
          <span className="text-brand-magenta font-bold text-lg">{formattedPrice}</span>
          
          <Button 
            onClick={() => addToCart(product)} 
            size="sm" 
            className="bg-brand-orange hover:bg-brand-orange/90 text-white"
          >
            <Plus className="mr-1 h-4 w-4" />
            Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
