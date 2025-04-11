
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Layers, Tag, ShoppingBag } from "lucide-react";

// Sample product categories
const categories = [
  { id: 1, name: "Todos os produtos", slug: "todos" },
  { id: 2, name: "Maquiagem", slug: "maquiagem" },
  { id: 3, name: "Skincare", slug: "skincare" },
  { id: 4, name: "Cabelo", slug: "cabelo" },
  { id: 5, name: "Corpo & Banho", slug: "corpo-banho" },
  { id: 6, name: "Fragrâncias", slug: "fragrancias" },
  { id: 7, name: "Suplementos", slug: "suplementos" },
  { id: 8, name: "Acessórios", slug: "acessorios" },
];

interface CategorySidebarProps {
  className?: string;
}

const CategorySidebar = ({ className }: CategorySidebarProps) => {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("todos");
  const navigate = useNavigate();

  useEffect(() => {
    const category = searchParams.get("category") || "todos";
    setActiveCategory(category);
  }, [searchParams]);

  const handleCategoryClick = (slug: string) => {
    setActiveCategory(slug);
    navigate(`/store?category=${slug}`);
  };

  return (
    <aside className={cn(
      "h-full bg-white dark:bg-gray-900 p-6 overflow-y-auto",
      className
    )}>
      <div className="flex items-center gap-2 mb-6">
        <div className="h-10 w-10 rounded-full bg-brand-magenta/10 dark:bg-brand-magenta/20 flex items-center justify-center">
          <ShoppingBag size={20} className="text-brand-magenta" />
        </div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-brand-magenta to-brand-orange bg-clip-text text-transparent">
          Categorias
        </h2>
      </div>
      
      <nav className="space-y-1">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.slug)}
            className={cn(
              "w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 group",
              activeCategory === category.slug
                ? "bg-brand-magenta/10 text-brand-magenta font-medium shadow-sm dark:bg-brand-magenta/20"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            )}
          >
            {activeCategory === category.slug ? (
              <Tag size={16} className="text-brand-magenta" />
            ) : (
              <Layers size={16} className="text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
            )}
            <span className={cn(
              "transition-all",
              activeCategory === category.slug && "translate-x-1"
            )}>
              {category.name}
            </span>
          </button>
        ))}
      </nav>
      
      {/* Decorative element */}
      <div className="mt-10 rounded-lg bg-gradient-to-br from-brand-magenta/5 to-brand-orange/5 p-4 border border-gray-100 dark:border-gray-800 dark:from-brand-magenta/10 dark:to-brand-orange/10">
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">Nossa seleção exclusiva</p>
        <p className="text-xs text-gray-400 dark:text-gray-400">Produtos selecionados especialmente para você.</p>
      </div>
    </aside>
  );
};

export default CategorySidebar;
