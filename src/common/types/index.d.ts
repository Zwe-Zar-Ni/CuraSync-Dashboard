export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
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
export interface UserProfile {
  id: number;
  name: string;
  email: string;
  profile_url: string | null;
  created_at: string;
  updated_at: string;
}
