
import { useState } from "react";
import { Plus, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product, useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();
  
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(product.price);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      toast({
        title: "Produto favoritado",
        description: `${product.name} foi adicionado aos seus favoritos.`,
      });
    }
  };

  const handleShare = () => {
    toast({
      title: "Compartilhar produto",
      description: `Link de ${product.name} copiado para a área de transferência.`,
    });
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm overflow-hidden card-hover-effect group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : ''}`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
        
        {/* Quick action buttons */}
        <div className={`absolute top-2 right-2 flex flex-col gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button 
            onClick={handleLike}
            className={`h-8 w-8 rounded-full backdrop-blur-md flex items-center justify-center transition-colors ${
              isLiked 
                ? 'bg-brand-magenta/90 text-white' 
                : 'bg-white/70 text-gray-600 hover:bg-white/90'
            }`}
          >
            <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
          </button>
          
          <button 
            onClick={handleShare}
            className="h-8 w-8 rounded-full backdrop-blur-md bg-white/70 text-gray-600 flex items-center justify-center hover:bg-white/90 transition-colors"
          >
            <Share2 size={16} />
          </button>
        </div>
        
        {/* Category badge */}
        <div className="absolute bottom-2 left-2">
          <span className="bg-white/80 backdrop-blur-sm text-xs px-2 py-1 rounded-full text-gray-700">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-900 text-lg mb-1 truncate group-hover:text-brand-magenta transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mt-3">
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
