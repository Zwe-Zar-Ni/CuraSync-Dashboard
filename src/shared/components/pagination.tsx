import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from '@/shared/components/ui/multi-select';

type Props = {
  currentPage: number;
  lastPage: number;
  total: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
};

const PER_PAGE_OPTIONS = [2, 3, 5, 10, 15, 30, 50];

const Pagination = ({
  currentPage,
  lastPage,
  total,
  perPage,
  onPageChange,
  onPerPageChange,
}: Props) => {
  return (
    <div className="my-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <p className="text-sm text-text-secondary">
          {currentPage} of {lastPage} ({total} total)
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-label">Per page</span>
          <MultiSelect
            values={[String(perPage)]}
            onValuesChange={(values) => onPerPageChange(Number(values[0]))}
            single={true}
          >
            <MultiSelectTrigger className="w-20 h-9">
              <MultiSelectValue />
            </MultiSelectTrigger>
            <MultiSelectContent search={false}>
              <MultiSelectGroup>
                {PER_PAGE_OPTIONS.map((opt) => (
                  <MultiSelectItem key={opt} value={String(opt)}>
                    {opt}
                  </MultiSelectItem>
                ))}
              </MultiSelectGroup>
            </MultiSelectContent>
          </MultiSelect>
        </div>

        {lastPage > 1 && (
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              <ChevronLeft />
            </Button>

            {(() => {
              const pages: (number | -1)[] = [];
              const start = Math.max(1, currentPage - 2);
              const end = Math.min(lastPage, currentPage + 2);

              if (start > 1) pages.push(1);
              if (start > 2) pages.push(-1);

              for (let i = start; i <= end; i++) pages.push(i);

              if (end < lastPage - 1) pages.push(-1);
              if (end < lastPage) pages.push(lastPage);

              return pages.map((p, i) =>
                p === -1 ? (
                  <span
                    key={`ellipsis-${i}`}
                    className="px-2 text-text-secondary"
                  >
                    ...
                  </span>
                ) : (
                  <Button
                    key={p}
                    variant={p === currentPage ? 'default' : 'outline'}
                    size="sm"
                    className="min-w-9"
                    onClick={() => onPageChange(p)}
                  >
                    {p}
                  </Button>
                ),
              );
            })()}

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= lastPage}
              onClick={() => onPageChange(currentPage + 1)}
            >
              <ChevronRight />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
