export type DoctorSchedule = {
  id: number;
  doctor_id: number;
  name: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  slot_duration_minutes: number;
  is_active: boolean;
  created_at: string;
};
