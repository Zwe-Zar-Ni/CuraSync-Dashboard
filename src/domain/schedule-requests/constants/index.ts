import type { ScheduleRequestStatus, ScheduleRequestType } from '../types';

export const SCHEDULE_REQUEST_STATUSES: ScheduleRequestStatus[] = [
  'PENDING',
  'APPROVED',
  'REJECTED',
];

export const SCHEDULE_REQUEST_TYPES: ScheduleRequestType[] = [
  'CREATE',
  'UPDATE',
  'DELETE',
];
