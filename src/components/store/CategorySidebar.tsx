
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

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
  const [activeCategory, setActiveCategory] = useState("todos");
  const navigate = useNavigate();

  const handleCategoryClick = (slug: string) => {
    setActiveCategory(slug);
    // In a real app, this would filter products by category
    // Here we're just updating the active state
    navigate(`/store?category=${slug}`);
  };

  return (
    <aside className={cn(
      "h-full bg-white border-r border-gray-200 p-4 overflow-y-auto",
      className
    )}>
      <div className="pb-4 mb-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Categorias</h2>
      </div>
      
      <nav className="space-y-1">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.slug)}
            className={cn(
              "w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center",
              activeCategory === category.slug
                ? "bg-brand-magenta/10 text-brand-magenta font-medium"
                : "text-gray-700 hover:bg-gray-100"
            )}
          >
            {category.name}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default CategorySidebar;
