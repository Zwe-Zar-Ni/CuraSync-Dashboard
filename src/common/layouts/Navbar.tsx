import { Button } from "@/shared/components/ui/button";

import { useNavigate } from "react-router";
import { SidebarTrigger } from "@/shared/components/ui/sidebar";
import { ThemeToggle } from "@/shared/components/ui/theme-toggle";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="rounded-b-xl bg-white dark:bg-background py-1 px-2 md:px-6 flex justify-between items-center">
      <SidebarTrigger className="-ml-1" />
      <div className="flex gap-5 items-center h-full">
        <Button
          variant="ghost"
          className="flex items-center gap-4 p-0 hover:bg-transparent"
          onClick={() => navigate("/dashboard")}
        >
          <div className="hidden md:block">
            <h3 className="text-start text-text-primary font-medium">
              {"Admin"}
            </h3>
            <span className="text-xs text-text-secondary">
              {"admin@gmail.com"}
            </span>
          </div>
        </Button>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
