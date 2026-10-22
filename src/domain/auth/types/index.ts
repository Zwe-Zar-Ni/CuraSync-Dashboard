import type { UserProfile } from '@/common/types';

export type AuthResponse = {
  token: string;
  data: UserProfile;
};
