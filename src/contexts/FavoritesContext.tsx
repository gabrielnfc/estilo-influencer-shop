
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";
import { Product } from '@/contexts/CartContext';

interface FavoritesContextType {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error('Failed to parse favorites:', error);
      }
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (product: Product) => {
    if (!isFavorite(product.id)) {
      setFavorites(prev => [...prev, product]);
      toast.success('Produto adicionado aos favoritos', {
        description: `${product.name} foi adicionado à sua lista de favoritos.`
      });
    }
  };

  const removeFromFavorites = (productId: number) => {
    if (isFavorite(productId)) {
      const product = favorites.find(fav => fav.id === productId);
      setFavorites(prev => prev.filter(item => item.id !== productId));
      
      if (product) {
        toast.info('Produto removido dos favoritos', {
          description: `${product.name} foi removido da sua lista de favoritos.`
        });
      }
    }
  };

  const isFavorite = (productId: number) => {
    return favorites.some(product => product.id === productId);
  };

  const clearFavorites = () => {
    setFavorites([]);
    toast.info('Lista de favoritos limpa');
  };

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      addToFavorites, 
      removeFromFavorites, 
      isFavorite, 
      clearFavorites 
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
