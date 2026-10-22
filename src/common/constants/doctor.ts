import type { DoctorStatus } from '../types/doctor';

export const DOCTOR_STATUSES = [
  'ACTIVE',
  'PENDING_VERIFICATION',
  'INACTIVE',
  'SUSPENDED',
] as DoctorStatus[];
