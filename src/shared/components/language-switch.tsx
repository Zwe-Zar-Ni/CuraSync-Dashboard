import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import i18next from 'i18next';
import type { LanguageOption } from '@/common/libs/i18n/types';
import { setLanguage } from '@/common/libs/i18n/utils';
import { languages } from '@/common/libs/i18n';
import { Languages } from 'lucide-react';

function LanguageSwitch() {
  const setLang = (lang: LanguageOption) => {
    i18next.changeLanguage(lang);
    setLanguage(lang);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <p className="flex w-10 h-10 border rounded-lg justify-center items-center">
          <Languages className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <span className="sr-only">Switch Language</span>
        </p>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.value}
            onClick={() => setLang(lang.value)}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSwitch;
