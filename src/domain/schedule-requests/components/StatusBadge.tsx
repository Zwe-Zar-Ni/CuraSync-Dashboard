import type { ScheduleRequestStatus } from '../types';
import { Badge } from '@/shared/components/ui/badge';

const STATUS_COLORS: Record<ScheduleRequestStatus, string> = {
  PENDING: 'bg-yellow-500',
  APPROVED: 'bg-green-500',
  REJECTED: 'bg-red-500',
};

const StatusBadge = ({ status }: { status: ScheduleRequestStatus }) => {
  return (
    <Badge className={`capitalize ${STATUS_COLORS[status]}`}>{status}</Badge>
  );
};

export default StatusBadge;
