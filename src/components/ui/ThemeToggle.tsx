
import { Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// This is now just a decorative button that doesn't actually toggle themes
export function ThemeToggle() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-transparent hover:bg-gray-100"
          aria-label="Tema claro"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-400 transition-all" />
          <span className="sr-only">Tema claro</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="bg-white text-gray-900">
        <p>Tema claro</p>
      </TooltipContent>
    </Tooltip>
  );
}
