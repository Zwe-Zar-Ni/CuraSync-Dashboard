import { useTranslation } from 'react-i18next';
import type { DoctorStatus } from '@/common/types/doctor';
import { Badge } from '@/shared/components/ui/badge';

const StatusBadge = ({ status }: { status: DoctorStatus }) => {
  const { t } = useTranslation();
  const color =
    status === 'ACTIVE'
      ? 'bg-green-500'
      : status === 'PENDING_VERIFICATION'
        ? 'bg-blue-500'
        : 'bg-transparent';
  return (
    <Badge className={`capitalize ${color}`}>
      {t(`doctors.statuses.${status}`)}
    </Badge>
  );
};

export default StatusBadge;
