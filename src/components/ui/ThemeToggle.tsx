
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Alternar tema"
        >
          {theme === "dark" ? (
            <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-400 transition-all" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem] text-gray-500 transition-all" />
          )}
          <span className="sr-only">Alternar tema</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <p>Alternar tema</p>
      </TooltipContent>
    </Tooltip>
  );
}
