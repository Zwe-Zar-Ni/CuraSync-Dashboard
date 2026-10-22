import type { Specialization } from '@/common/types/doctor';
import { Stethoscope } from 'lucide-react';

const SpecializationsList = ({
  specializations,
}: {
  specializations: Specialization[];
}) => {
  if (specializations.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No specializations listed.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {specializations.map((spec) => (
        <li key={spec.name} className="flex gap-3">
          {spec.icon_url ? (
            <img
              src={spec.icon_url}
              alt=""
              className="size-8 shrink-0 rounded-md object-cover"
            />
          ) : (
            <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted">
              <Stethoscope className="size-4 text-muted-foreground" />
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-medium">{spec.name}</p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {spec.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SpecializationsList;
