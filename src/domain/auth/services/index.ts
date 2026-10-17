import { httpClient } from "@/common/api/apiClient";
import type { LoginSchema } from "../validations/login";
import type { AuthResponse } from "../types";

class AuthService {
  async login(input: LoginSchema) {
    const response = await httpClient.post<AuthResponse>("/auth/login", input);
    return response.data;
  }
}

const authService = new AuthService();
export default authService;
