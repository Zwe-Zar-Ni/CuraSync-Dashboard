import type { DoctorStatus } from "@/common/types";

export interface Specialization {
  name: string;
  description: string;
  icon_url: string;
}

export interface Qualification {
  name: string;
  institution: string;
  year: string;
}

export interface Schedule {
  id: number;
  day_of_week: number;
  start_time: string;
  end_time: string;
  slot_duration_minutes: number;
}

export type DoctorResource = {
  id: number;
  status: DoctorStatus;
  license_number: string;
  standard_consultation_fee: number;
  bio: string;
  total_patient_count: number;
  rating_count: number;
  average_rating: number;
  specilizations: Specialization[];
  qualifications: Qualification[];
  schedules: Schedule[];
  schedule_overrides: unknown[];
  name: string;
  email: string;
  phone_number: string;
  profile_url: string;
};
