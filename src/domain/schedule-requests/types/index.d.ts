import type { DoctorResource } from '@/common/types/doctor';

export type ScheduleRequestType = 'CREATE' | 'UPDATE' | 'DELETE';

export type ScheduleRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

type DoctorScheduleRequest = {
  id: number;
  doctor_id: number;
  day_of_week: number;
  start_time: string;
  end_time: string;
  slot_duration_minutes: number;
  is_active: boolean;
};

type ScheduleRequestUser = {
  id: number;
  name: string;
  email: string;
  phone_number: string | null;
};

export type ScheduleRequest = {
  id: number;
  doctor_id: number;
  doctor_schedule_id: null | number;
  request_type: ScheduleRequestType;
  data: {
    day_of_week: number;
    start_time: string;
    end_time: string;
    slot_duration_minutes: number;
  };
  doctor_note: string;
  status: ScheduleRequestStatus;
  admin_note: null | string;
  user_id: number | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
  doctor: DoctorResource;
  user: ScheduleRequestUser | null;
  doctor_schedule: null | DoctorScheduleRequest;
};
