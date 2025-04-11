
import React from "react";
import Header from "@/components/ui/Header";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, className }) => {
  const { theme } = useTheme();
  
  return (
    <div className={cn(
      "min-h-screen flex flex-col",
      theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
    )}>
      <Header />
      <main className={cn("flex-1 px-4 pb-6 md:px-6", className)}>
        <div className="max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
      
      {/* Subtle background pattern */}
      <div className={cn(
        "fixed inset-0 -z-10 pointer-events-none",
        theme === "dark" ? "bg-grid-dark" : "bg-grid-white"
      )} />
    </div>
  );
};

export default MainLayout;
