import { useSearchParams } from 'react-router';
import { extractFilters, readFilters, setFilters } from '../utils';
import { useMemo, useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Filter } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/shared/components/ui/sheet';
import { useGetDoctorSchedules } from '../queries';
import type { DoctorSchedulesFilterInputType } from '../validations/filter';
import DoctorSchedulesFilter from '../components/DoctorSchedulesFilter';
import DoctorSchedulesListLoading from '../components/DoctorSchedulesListLoading';
import DoctorSchedulesList from '../components/DoctorSchedulesList';

const DoctorsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = useMemo(() => readFilters(searchParams), [searchParams]);
  const [filterOpen, setFilterOpen] = useState(false);

  const extractedFilters = extractFilters(filters);

  const { data, isLoading, isError } = useGetDoctorSchedules(extractedFilters);

  const handleSearch = (values: DoctorSchedulesFilterInputType) => {
    setFilterOpen(false);
    const next = setFilters(values);
    setSearchParams(next, { replace: true });
  };

  return (
    <div>
      <div className="mb-4 md:flex justify-between items-center">
        <div>
          <h1 className="md:text-2xl font-semibold text-text-primary/80">
            Doctors
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
        <DoctorSchedulesFilter values={filters} onSearch={handleSearch} />
      </div>
      <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <DoctorSchedulesFilter
            values={filters}
            onSearch={handleSearch}
            layout="col"
          />
        </SheetContent>
      </Sheet>

      {isLoading ? (
        <DoctorSchedulesListLoading />
      ) : isError || !data ? (
        <p>Error</p>
      ) : (
        <div>
          <DoctorSchedulesList schedules={data} />
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;
