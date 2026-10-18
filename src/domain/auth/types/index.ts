import type { User } from "@/common/types";

export type AuthResponse = {
  token: string;
  data: {
    user: User;
    role: string;
    profile: null;
  };
};
