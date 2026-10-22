import { Badge } from '@/shared/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import type { ScheduleRequest, ScheduleRequestType } from '../types';
import StatusBadge from './StatusBadge';
import dayjs from 'dayjs';
import { getDayOfWeekLabel } from '@/common/utils/doctor';

type Props = {
  requests: ScheduleRequest[];
};

const REQUEST_TYPE_COLORS: Record<ScheduleRequestType, string> = {
  CREATE: 'bg-blue-500',
  UPDATE: 'bg-yellow-500',
  DELETE: 'bg-red-500',
};

const ScheduleRequestsTable = ({ requests }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Request ID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Request Type</TableHead>
          <TableHead>Doctor</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Day</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Slot Duration</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <TableRow key={request.id}>
            <TableCell className="font-medium">{request.id}</TableCell>
            <TableCell>
              <StatusBadge status={request.status} />
            </TableCell>
            <TableCell>
              <Badge
                className={`capitalize ${REQUEST_TYPE_COLORS[request.request_type]}`}
              >
                {request.request_type}
              </Badge>
            </TableCell>
            <TableCell>{request.doctor.name}</TableCell>
            <TableCell>{request.doctor.phone_number}</TableCell>
            <TableCell className="capitalize">
              {getDayOfWeekLabel(request.data.day_of_week)}
            </TableCell>
            <TableCell>
              {request.data.start_time} - {request.data.end_time}
            </TableCell>
            <TableCell>{request.data.slot_duration_minutes} min</TableCell>
            <TableCell>
              {dayjs(request.created_at).format('YYYY-MMM-DD')}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ScheduleRequestsTable;
