import { Moon, Sun } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/shared/components/ui/dropdown-menu";
import { useTheme } from "@/shared/components/theme-provider";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  const setAppTheme = (theme: "light" | "dark" | "system") => {
    setTheme(theme);
    localStorage.setItem("cura-ui-theme", theme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <p className="flex w-10 h-10 border rounded-lg justify-center items-center">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </p>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setAppTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setAppTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setAppTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
