import { useTranslation } from 'react-i18next';
import type { Qualification } from '@/common/types/doctor';
import { Badge } from '@/shared/components/ui/badge';

const QualificationsList = ({
  qualifications,
}: {
  qualifications: Qualification[];
}) => {
  const { t } = useTranslation();

  if (qualifications.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        {t('doctors.noQualifications')}
      </p>
    );
  }

  return (
    <ul className="divide-y">
      {qualifications.map((qual, i) => (
        <li
          key={`${qual.name}-${i}`}
          className="flex items-center justify-between gap-3 py-2 first:pt-0 last:pb-0"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{qual.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {qual.institution}
            </p>
          </div>
          <Badge variant="outline" className="shrink-0">
            {qual.year}
          </Badge>
        </li>
      ))}
    </ul>
  );
};

export default QualificationsList;
