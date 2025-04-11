
import React from "react";
import Header from "@/components/ui/Header";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className={cn("flex-1 px-4 pb-6 md:px-6", className)}>
        <div className="max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
      
      {/* Subtle background pattern */}
      <div className="fixed inset-0 -z-10 bg-grid-white pointer-events-none" />
    </div>
  );
};

export default MainLayout;
