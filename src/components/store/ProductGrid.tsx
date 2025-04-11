
import { useState, useMemo } from "react";
import { Search, ArrowDownAZ, ArrowDownZA, ArrowUpDown, X, ChevronDown } from "lucide-react";
import ProductCard from "./ProductCard";
import { Product } from "@/contexts/CartContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductGridProps {
  products: Product[];
  category?: string;
}

type SortOption = "name-asc" | "name-desc" | "price-asc" | "price-desc";

const PRODUCTS_PER_PAGE = 8; // Número de produtos exibidos inicialmente

const ProductGrid = ({ products, category }: ProductGridProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("name-asc");
  const [visibleProducts, setVisibleProducts] = useState(PRODUCTS_PER_PAGE);
  
  const getSortIcon = (currentSort: SortOption) => {
    switch (currentSort) {
      case "name-asc":
        return <ArrowDownAZ size={18} />;
      case "name-desc":
        return <ArrowDownZA size={18} />;
      case "price-asc":
        return <ArrowUpDown size={18} className="rotate-180" />;
      case "price-desc":
        return <ArrowUpDown size={18} />;
      default:
        return <ArrowDownAZ size={18} />;
    }
  };

  const filteredAndSortedProducts = useMemo(() => {
    // Filter products by search query and category
    let filtered = products;
    
    if (category && category !== "todos") {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query)
      );
    }
    
    // Sort products
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return 0;
      }
    });
  }, [products, searchQuery, sortBy, category]);
  
  const clearFilters = () => {
    setSearchQuery("");
    setSortBy("name-asc");
  };

  const loadMoreProducts = () => {
    setVisibleProducts(prev => prev + PRODUCTS_PER_PAGE);
  };

  const hasMoreProducts = filteredAndSortedProducts.length > visibleProducts;

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 focus-visible:ring-brand-magenta border-gray-200"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={sortBy === "name-asc" ? "default" : "outline"}
              size="sm"
              className={sortBy === "name-asc" ? "bg-brand-magenta" : ""}
              onClick={() => setSortBy("name-asc")}
            >
              <ArrowDownAZ size={16} className="mr-1" />
              A-Z
            </Button>
            
            <Button
              variant={sortBy === "name-desc" ? "default" : "outline"}
              size="sm"
              className={sortBy === "name-desc" ? "bg-brand-magenta" : ""}
              onClick={() => setSortBy("name-desc")}
            >
              <ArrowDownZA size={16} className="mr-1" />
              Z-A
            </Button>
            
            <Button
              variant={sortBy === "price-asc" ? "default" : "outline"}
              size="sm"
              className={sortBy === "price-asc" ? "bg-brand-magenta" : ""}
              onClick={() => setSortBy("price-asc")}
            >
              <ArrowUpDown size={16} className="mr-1 rotate-180" />
              Menor Preço
            </Button>
            
            <Button
              variant={sortBy === "price-desc" ? "default" : "outline"}
              size="sm"
              className={sortBy === "price-desc" ? "bg-brand-magenta" : ""}
              onClick={() => setSortBy("price-desc")}
            >
              <ArrowUpDown size={16} className="mr-1" />
              Maior Preço
            </Button>
            
            {(searchQuery || sortBy !== "name-asc") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-gray-500 hover:text-red-500"
              >
                <X size={16} className="mr-1" />
                Limpar filtros
              </Button>
            )}
          </div>
        </div>
        
        {searchQuery && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm text-gray-500">Resultados para:</span>
            <Badge variant="secondary" className="bg-gray-100">
              {searchQuery}
              <X 
                size={14} 
                className="ml-1 cursor-pointer" 
                onClick={() => setSearchQuery("")}
              />
            </Badge>
          </div>
        )}
      </div>
      
      {filteredAndSortedProducts.length === 0 ? (
        <div className="bg-white text-center py-12 rounded-xl border border-gray-100 shadow-sm">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhum produto encontrado</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Tente ajustar seus filtros ou termos de busca para encontrar o que procura.
          </p>
          <Button 
            onClick={clearFilters}
            variant="outline"
            className="mt-4"
          >
            Limpar filtros
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAndSortedProducts.slice(0, visibleProducts).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {hasMoreProducts && (
            <div className="flex justify-center pt-4">
              <Button 
                onClick={loadMoreProducts} 
                variant="outline" 
                className="border-brand-magenta text-brand-magenta hover:bg-brand-magenta/10"
              >
                Carregar mais produtos
                <ChevronDown size={16} className="ml-1" />
              </Button>
            </div>
          )}
        </div>
      )}
      
      {filteredAndSortedProducts.length > 0 && (
        <div className="flex justify-center">
          <p className="text-gray-500 text-sm">
            Exibindo {Math.min(visibleProducts, filteredAndSortedProducts.length)} de {filteredAndSortedProducts.length} produto(s)
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
