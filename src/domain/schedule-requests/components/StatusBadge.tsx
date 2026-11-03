import { useTranslation } from 'react-i18next';
import type { ScheduleRequestStatus } from '../types';
import { Badge } from '@/shared/components/ui/badge';

const STATUS_COLORS: Record<ScheduleRequestStatus, string> = {
  PENDING: 'bg-yellow-500',
  APPROVED: 'bg-green-500',
  REJECTED: 'bg-red-500',
};

const StatusBadge = ({ status }: { status: ScheduleRequestStatus }) => {
  const { t } = useTranslation();
  return (
    <Badge className={`capitalize ${STATUS_COLORS[status]}`}>
      {t(`scheduleRequests.statuses.${status}`)}
    </Badge>
  );
};

export default StatusBadge;
