export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    currentPage: number;
    hasMorePages: boolean;
    lastPage: number;
    nextPageUrl: string | null;
    perPage: number;
    previousPageUrl: null | string;
    total: number;
  };
};

export type ApiError = {
  data: {
    message: string;
    data: [];
    errors: {
      string: string[];
    };
  };
};

export type User = {
  id: number;
  name: string;
  email: string;
  phone_number: string | null;
  profile_url: string | null;
};

export type UserProfile = {
  user: User;
  role: "admin";
  profile: null;
};

export type DoctorStatus =
  | "ACTIVE"
  | "PENDING_VERIFICATION"
  | "INACTIVE"
  | "SUSPENDED";

export type Doctor = {
  id: number;
  status: DoctorStatus;
  license_number: string | null;
  standard_consultation_fee: number | null;
  bio: string | null;
  total_patient_count: number;
  rating_count: number;
  average_rating: number;
};

export type Patient = {
  id: number;
  date_of_birth: string | null;
  gender: "M" | "F" | null;
  blood_type: string | null;
};

export type DoctorProfile = {
  user: User;
  role: "doctor";
  profile: Doctor;
};

export type PatientProfile = {
  user: User;
  role: "patient";
  profile: Patient;
};
