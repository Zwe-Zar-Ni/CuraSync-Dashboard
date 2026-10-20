import { useSearchParams } from "react-router";
import { useMemo, useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/shared/components/ui/sheet";
import Pagination from "@/shared/components/pagination";
import ScheduleRequestsListLoading from "../components/ScheduleRequestsListLoading";
import ScheduleRequestsTable from "../components/ScheduleRequestsTable";
import ScheduleRequestsFilter from "../components/ScheduleRequestsFilter";
import { useGetRequests } from "../queries";
import { extractFilters, readFilters, setFilters } from "../utils";
import type { ScheduleRequestFilterInputType } from "../validations/filter";

const ScheduleRequestsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = useMemo(() => readFilters(searchParams), [searchParams]);
  const [filterOpen, setFilterOpen] = useState(false);

  const extractedFilters = extractFilters(filters);

  const { data, isLoading, isError } = useGetRequests(extractedFilters);

  const handleSearch = (values: ScheduleRequestFilterInputType) => {
    setFilterOpen(false);
    const next = setFilters(values);
    setSearchParams(next, { replace: true });
  };

  const handlePageChange = (newPage: number) => {
    const next = setFilters({ ...filters, page: newPage });
    setSearchParams(next, { replace: true });
  };

  const handlePerPageChange = (newPerPage: number) => {
    const next = setFilters({ ...filters, per_page: newPerPage, page: 1 });
    setSearchParams(next, { replace: true });
  };

  return (
    <div>
      <div className="mb-4 md:flex justify-between items-center">
        <div>
          <h1 className="md:text-2xl font-semibold text-text-primary/80">
            Schedule Requests
          </h1>
        </div>
        <div className="flex justify-between mt-2 md:mt-0 gap-4">
          <Button
            variant="outline"
            size="lg"
            className="border-border flex md:hidden"
            onClick={() => setFilterOpen(true)}
          >
            <Filter />
          </Button>
        </div>
      </div>

      <div className="hidden md:flex">
        <ScheduleRequestsFilter values={filters} onSearch={handleSearch} />
      </div>
      <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <ScheduleRequestsFilter
            values={filters}
            onSearch={handleSearch}
            layout="col"
          />
        </SheetContent>
      </Sheet>

      {isLoading ? (
        <ScheduleRequestsListLoading />
      ) : isError || !data ? (
        <p>Error</p>
      ) : (
        <div>
          <ScheduleRequestsTable requests={data.data} />
          <Pagination
            currentPage={data.meta.currentPage}
            lastPage={data.meta.lastPage}
            total={data.meta.total}
            perPage={data.meta.perPage}
            onPageChange={handlePageChange}
            onPerPageChange={handlePerPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ScheduleRequestsPage;
