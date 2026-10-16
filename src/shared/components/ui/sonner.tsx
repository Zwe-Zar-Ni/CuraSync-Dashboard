import { Toaster as Sonner, type ToasterProps } from 'sonner';
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from 'lucide-react';

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme={'light'}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: 'cn-toast',
        },
      }}
      {...props}
    />
  );
};

const toastOptions = {
  classNames: {
    error: '!bg-destructive !text-white !border-destructive !text-base !w-100',
    info: '!bg-blue-500 !text-white !border-blue-500 !text-base !w-100',
    warning: '!bg-yellow-500 !text-white !border-yellow-500 !text-base !w-100',
    success: '!bg-green-500 !text-white !border-green-500 !text-base !w-100',
  },
} as const;

// eslint-disable-next-line react-refresh/only-export-components
export { Toaster, toastOptions };
