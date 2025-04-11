
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import StoreLayout from "@/components/layouts/StoreLayout";
import ProductGrid from "@/components/store/ProductGrid";
import { Product } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Tag, Sparkles } from "lucide-react";

// Sample product data
const productData: Product[] = [
  {
    id: 1,
    name: "Base Líquida Ultra HD",
    price: 89.90,
    category: "Maquiagem",
    image: "https://images.unsplash.com/photo-1596704017254-9a89b5d155cc?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Sérum Facial Vitamina C",
    price: 129.90,
    category: "Skincare",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Máscara para Cílios Volume",
    price: 69.90,
    category: "Maquiagem",
    image: "https://images.unsplash.com/photo-1631730359585-38a4935cbcec?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Shampoo Hidratante",
    price: 59.90,
    category: "Cabelo",
    image: "https://images.unsplash.com/photo-1626618012641-319588c8a40d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Hidratante Corporal",
    price: 49.90,
    category: "Corpo & Banho",
    image: "https://images.unsplash.com/photo-1556228578-8d89a1dde6a8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "Perfume Floral Intenso",
    price: 199.90,
    category: "Fragrâncias",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    name: "Colágeno em Pó",
    price: 89.90,
    category: "Suplementos",
    image: "https://images.unsplash.com/photo-1612531047288-7b0622429779?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    name: "Kit Pincéis Maquiagem",
    price: 149.90,
    category: "Acessórios",
    image: "https://images.unsplash.com/photo-1522336572468-97b06e8ef143?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 9,
    name: "Protetor Solar FPS 50",
    price: 79.90,
    category: "Skincare",
    image: "https://images.unsplash.com/photo-1556227834-09f1de7a7d14?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 10,
    name: "Batom Matte Longa Duração",
    price: 39.90,
    category: "Maquiagem",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 11,
    name: "Máscara Capilar Reparadora",
    price: 69.90,
    category: "Cabelo",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 12,
    name: "Óleo Corporal Hidratante",
    price: 59.90,
    category: "Corpo & Banho",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=80"
  }
];

const StorePage = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const category = searchParams.get("category") || "todos";

  useEffect(() => {
    // Simulate API loading
    const loadProducts = async () => {
      setIsLoading(true);
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setProducts(productData);
      setIsLoading(false);
    };

    loadProducts();
  }, []);

  const getCategoryLabel = (cat: string) => {
    return cat === "todos" ? "Todos os Produtos" : cat;
  };

  return (
    <StoreLayout>
      <div className="mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-brand-magenta/10 flex items-center justify-center">
              <ShoppingBag size={20} className="text-brand-magenta" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-magenta to-brand-orange bg-clip-text text-transparent">
                Nossa Loja
              </h1>
              <p className="text-gray-500 text-sm">
                Encontre os produtos exclusivos selecionados para você
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-dashed border-gray-100">
            <div className="flex items-center gap-2">
              <Tag size={16} className="text-brand-magenta" />
              <span className="text-sm font-medium text-gray-700">Categoria atual:</span>
              <Badge className="bg-brand-magenta">
                {getCategoryLabel(category)}
              </Badge>
            </div>
            
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Sparkles size={14} className="text-brand-orange" />
              <span className="hidden sm:inline-block">+1500 clientes satisfeitos</span>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ProductGrid products={products} category={category} />
        )}
      </div>
    </StoreLayout>
  );
};

export default StorePage;
