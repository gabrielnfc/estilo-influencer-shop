
import { useState } from "react";
import StoreLayout from "@/components/layouts/StoreLayout";
import { useFavorites } from "@/contexts/FavoritesContext";
import ProductCard from "@/components/store/ProductCard";
import { Button } from "@/components/ui/button";
import { Heart, X, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";

const FavoritesPage = () => {
  const { favorites, clearFavorites } = useFavorites();
  const [isGridView, setIsGridView] = useState(true);

  if (favorites.length === 0) {
    return (
      <StoreLayout>
        <Card className="w-full max-w-3xl mx-auto mt-8">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
                <Heart className="h-8 w-8 text-gray-400" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-brand-magenta to-brand-orange bg-clip-text text-transparent">
              Sua lista de favoritos está vazia
            </CardTitle>
            <CardDescription className="text-gray-500 mt-2">
              Você ainda não adicionou produtos aos seus favoritos. Navegue pela loja e clique no ícone de coração para adicionar itens aqui.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-6">
            <Button 
              variant="outline" 
              className="border-brand-magenta text-brand-magenta hover:bg-brand-magenta/10"
              onClick={() => window.location.href = "/store"}
            >
              Voltar à loja
            </Button>
          </CardContent>
        </Card>
      </StoreLayout>
    );
  }

  return (
    <StoreLayout>
      <div className="mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-brand-magenta/10 flex items-center justify-center">
              <Heart size={20} className="text-brand-magenta" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-magenta to-brand-orange bg-clip-text text-transparent">
                Meus Favoritos
              </h1>
              <p className="text-gray-500 text-sm">
                {favorites.length} {favorites.length === 1 ? "produto" : "produtos"} na sua lista de favoritos
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-between mt-4 pt-4 border-t border-dashed border-gray-100">
            <div className="flex gap-2 mb-2 sm:mb-0">
              <Button
                variant={isGridView ? "default" : "outline"}
                size="sm"
                className={isGridView ? "bg-brand-magenta" : ""}
                onClick={() => setIsGridView(true)}
              >
                Grade
              </Button>
              <Button
                variant={!isGridView ? "default" : "outline"}
                size="sm"
                className={!isGridView ? "bg-brand-magenta" : ""}
                onClick={() => setIsGridView(false)}
              >
                Lista
              </Button>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              className="text-red-500 border-red-200 hover:bg-red-50"
              onClick={clearFavorites}
            >
              <Trash2 size={16} className="mr-1" />
              Limpar favoritos
            </Button>
          </div>
        </div>

        {isGridView ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map((product) => (
              <div key={product.id} className="flex items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="h-16 w-16 bg-gray-50 rounded-md overflow-hidden flex-shrink-0 mr-4">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className="text-brand-magenta font-bold">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(product.price)}
                    </span>
                    <span className="ml-2 text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-500">
                      {product.category}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2 text-red-500 hover:bg-red-50"
                  onClick={() => {
                    const { removeFromFavorites } = useFavorites();
                    removeFromFavorites(product.id);
                  }}
                >
                  <X size={18} />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </StoreLayout>
  );
};

export default FavoritesPage;
