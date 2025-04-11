
import React from "react";
import Header from "@/components/ui/Header";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className={cn("flex-1 px-4 pb-6 md:px-6", className)}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
