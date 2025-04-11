
import { useState } from "react";
import { Plus, Heart, Share2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product, useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, cartItems } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { toast } = useToast();
  
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(product.price);

  const cartItem = cartItems.find(item => item.id === product.id);
  const itemInCart = cartItem ? cartItem.quantity : 0;

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
      className="bg-white rounded-xl overflow-hidden card-hover-effect group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-52 overflow-hidden bg-gray-100">
        <div className={`absolute inset-0 flex items-center justify-center text-gray-400 transition-opacity ${isImageLoaded ? 'opacity-0' : 'opacity-100'}`}>
          <ShoppingCart size={24} className="opacity-20" />
        </div>
        <img 
          src={product.image} 
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-110' : 'scale-100'} ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsImageLoaded(true)}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
            setIsImageLoaded(true);
          }}
        />
        
        {/* Quick action buttons */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
          <button 
            onClick={handleLike}
            className={`h-9 w-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 ${
              isLiked 
                ? 'bg-brand-magenta text-white' 
                : 'bg-white/80 text-gray-600 hover:bg-white'
            }`}
            aria-label={isLiked ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
          </button>
          
          <button 
            onClick={handleShare}
            className="h-9 w-9 rounded-full backdrop-blur-md bg-white/80 text-gray-600 flex items-center justify-center hover:bg-white hover:scale-110 transition-all"
            aria-label="Compartilhar produto"
          >
            <Share2 size={16} />
          </button>
        </div>
        
        {/* Category badge */}
        <div className={`absolute bottom-3 left-3 transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm text-xs font-medium text-gray-700 border-0">
            {product.category}
          </Badge>
        </div>

        {/* Cart count badge */}
        {itemInCart > 0 && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-brand-magenta">
              {itemInCart} no carrinho
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-900 text-lg mb-1 truncate group-hover:text-brand-magenta transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-brand-magenta font-bold text-lg">{formattedPrice}</span>
            {itemInCart > 0 && (
              <span className="ml-2 text-xs text-gray-500">
                Total: {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(product.price * itemInCart)}
              </span>
            )}
          </div>
          
          <Button 
            onClick={() => addToCart(product)} 
            size="sm" 
            className={`bg-brand-orange hover:bg-brand-orange/90 text-white group-hover:shadow-md transition-all ${
              itemInCart > 0 ? 'animate-pulse' : ''
            }`}
          >
            <Plus className="mr-1 h-4 w-4" />
            {itemInCart > 0 ? `Adicionar +` : 'Adicionar'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
