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
import { Button } from '@/shared/components/ui/button';
import { Edit } from 'lucide-react';
import { useState } from 'react';
import UpdateScheduleRequestForm from './UpdateScheduleRequestForm';

type Props = {
  requests: ScheduleRequest[];
};

const REQUEST_TYPE_COLORS: Record<ScheduleRequestType, string> = {
  CREATE: 'bg-blue-500',
  UPDATE: 'bg-yellow-500',
  DELETE: 'bg-red-500',
};

const ScheduleRequestsTable = ({ requests }: Props) => {
  const [selectedRequest, setSelectedRequest] =
    useState<ScheduleRequest | null>(null);

  return (
    <>
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
            <TableHead>Requested At</TableHead>
            <TableHead></TableHead>
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
                {request.request_type === 'DELETE' && request.doctor_schedule
                  ? getDayOfWeekLabel(request.doctor_schedule?.day_of_week)
                  : request.data
                    ? getDayOfWeekLabel(request.data?.day_of_week)
                    : '-'}
              </TableCell>
              <TableCell>
                {request.request_type === 'DELETE' && request.doctor_schedule
                  ? `${request.doctor_schedule?.start_time} - ${request.doctor_schedule?.end_time}`
                  : request.data
                    ? `${request.data?.start_time} - ${request.data?.end_time}`
                    : '-'}
              </TableCell>
              <TableCell>
                {request.request_type === 'DELETE' && request.doctor_schedule
                  ? '-'
                  : request.data
                    ? `${request.data?.slot_duration_minutes} min`
                    : '-'}
              </TableCell>
              <TableCell>
                {dayjs(request.created_at).format('YYYY-MMM-DD')}
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  onClick={() => setSelectedRequest(request)}
                >
                  <Edit />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedRequest && (
        <UpdateScheduleRequestForm
          key={selectedRequest.id}
          request={selectedRequest}
          open={true}
          onOpenChange={(open) => {
            if (!open) setSelectedRequest(null);
          }}
        />
      )}
    </>
  );
};

export default ScheduleRequestsTable;
