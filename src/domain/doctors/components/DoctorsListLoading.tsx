import { Skeleton } from '@/shared/components/ui/skeleton';

const DoctorsListLoading = () => {
  return (
    <div className="border p-2 rounded-lg min-w-125">
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="grid grid-cols-9 gap-1 my-2 items-center">
            <Skeleton className="w-full h-10 rounded-lg" />
            <Skeleton className="w-full h-10 rounded-lg" />
            <Skeleton className="w-full h-10 rounded-lg" />
            <Skeleton className="w-full h-10 rounded-lg" />
            <Skeleton className="w-full h-10 rounded-lg" />
            <Skeleton className="w-full h-10 rounded-lg" />
            <Skeleton className="w-full h-10 rounded-lg" />
            <Skeleton className="w-full h-10 rounded-lg" />
            <Skeleton className="w-full h-10 rounded-lg" />
          </div>
        ))}
    </div>
  );
};

export default DoctorsListLoading;
