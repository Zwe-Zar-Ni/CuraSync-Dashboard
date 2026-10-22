import type { DoctorStatus } from '@/common/types/doctor';
import { Badge } from '@/shared/components/ui/badge';

const StatusBadge = ({ status }: { status: DoctorStatus }) => {
  const color =
    status === 'ACTIVE'
      ? 'bg-green-500'
      : status === 'PENDING_VERIFICATION'
        ? 'bg-blue-500'
        : 'bg-transparent';
  return (
    <Badge className={`capitalize ${color}`}>
      {status.split('_').join(' ').toLowerCase()}
    </Badge>
  );
};

export default StatusBadge;
