import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "@/router/index.tsx";

import { QueryClientProvider } from "@tanstack/react-query";

import "@/common/libs/i18n";
import { getLanguage } from "@/common/libs/i18n/utils";
import i18n from "@/common/libs/i18n";
import queryClient from "@/common/api/queryClient";

import { Toaster, toastOptions } from "@/shared/components/ui/sonner";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { ThemeProvider, type Theme } from "@/shared/components/theme-provider";

const language = getLanguage();
i18n.changeLanguage(language);

const initialTheme = localStorage.getItem("cura-ui-theme") ?? "dark";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      defaultTheme={initialTheme as Theme}
      storageKey="cura-ui-theme"
    >
      <Toaster
        expand={true}
        visibleToasts={3}
        position="bottom-center"
        toastOptions={toastOptions}
        duration={5000}
      />
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);
