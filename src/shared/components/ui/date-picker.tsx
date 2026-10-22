import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Calendar } from '@/shared/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

type Props = {
  value?: string;
  onChange: (date: string) => void;
  placeholder?: string;
  className?: string;
};

export function DatePicker({ value, onChange, placeholder, className }: Props) {
  const [date, setDate] = useState<Date | undefined>(
    value != undefined ? new Date(value) : undefined,
  );

  const onDateChange = (date?: Date) => {
    setDate(date ?? undefined);
    onChange(date ? dayjs(date).format('YYYY-MM-DD') : '');
  };

  useEffect(() => {
    if (!value || value === '') {
      setDate(undefined);
    }
  }, [value]);

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant={'outline'}
            data-empty={!date}
            className={` h-10 justify-between text-left font-normal data-[empty=true]:text-muted-foreground ${className}`}
          >
            {date ? (
              dayjs(date).format('YYYY-MMM-DD')
            ) : (
              <span>{placeholder ?? 'Pick a date'}</span>
            )}
            <ChevronDownIcon data-icon="inline-end" />
          </Button>
        }
      />
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value ? new Date(value) : undefined}
          onSelect={(selected) => onDateChange(selected)}
          defaultMonth={date}
          required={false}
          captionLayout="dropdown"
        />
        <div className="flex gap-2 p-2 pt-0">
          <Button
            className="flex-1"
            variant="outline"
            onClick={() => onDateChange(new Date())}
          >
            Today
          </Button>
          <Button
            className="flex-1"
            variant="outline"
            onClick={() => onDateChange()}
          >
            Clear
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
