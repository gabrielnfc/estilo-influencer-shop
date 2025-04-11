
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Header from "@/components/ui/Header";
import CategorySidebar from "@/components/store/CategorySidebar";

interface StoreLayoutProps {
  children: React.ReactNode;
}

const StoreLayout: React.FC<StoreLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="flex flex-1">
        {/* Mobile sidebar toggle */}
        <button 
          onClick={toggleSidebar}
          className="lg:hidden fixed z-50 bottom-4 right-4 bg-brand-magenta text-white p-3 rounded-full shadow-lg"
          aria-label={sidebarOpen ? "Fechar menu" : "Abrir menu"}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Sidebar */}
        <div className={`
          lg:w-64 lg:flex-shrink-0 transition-all duration-300
          fixed lg:relative z-40 h-full
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}>
          <CategorySidebar />
        </div>
        
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={toggleSidebar}
          ></div>
        )}
        
        {/* Main content */}
        <main className="flex-1 px-4 py-6 md:px-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default StoreLayout;
