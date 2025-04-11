
import React, { useState } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import Header from "@/components/ui/Header";
import CategorySidebar from "@/components/store/CategorySidebar";

interface StoreLayoutProps {
  children: React.ReactNode;
}

const StoreLayout: React.FC<StoreLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <Header />
      
      <div className="flex flex-1">
        {/* Mobile sidebar toggle */}
        <button 
          onClick={toggleSidebar}
          className="lg:hidden fixed z-50 bottom-4 right-4 bg-brand-magenta text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform"
          aria-label={sidebarOpen ? "Fechar menu" : "Abrir menu"}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Sidebar */}
        <div className={`
          lg:w-64 lg:flex-shrink-0 transition-all duration-300
          fixed lg:relative z-40 h-full 
          bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 shadow-sm
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}>
          <CategorySidebar />
        </div>
        
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30 backdrop-blur-sm"
            onClick={toggleSidebar}
          ></div>
        )}
        
        {/* Main content */}
        <main className="flex-1 px-4 py-6 md:px-6 overflow-y-auto dark:bg-gray-900">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
      
      {/* Subtle background pattern */}
      <div className="fixed inset-0 -z-10 bg-grid-white pointer-events-none opacity-30 dark:opacity-5" />
    </div>
  );
};

export default StoreLayout;
