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
