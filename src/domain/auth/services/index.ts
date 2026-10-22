import { httpClient } from '@/common/api/apiClient';
import type { LoginSchema } from '../validations';
import type { AuthResponse } from '../types';

class AuthService {
  async login(input: LoginSchema) {
    const response = await httpClient.post('/auth/login', input);
    return response.data as AuthResponse;
  }
}

const authService = new AuthService();
export default authService;
