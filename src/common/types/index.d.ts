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

export type UserProfile = {
  user: {
    id: number;
    name: string;
    email: string;
    phone_number: string | null;
    profile_url: string | null;
  };
  role: "admin";
  profile: null;
};
