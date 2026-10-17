import type { ApiError } from "@/common/types";
import { useMutation } from "@tanstack/react-query";
import authService from "../services";
import type { AuthResponse } from "../types";
import type { LoginSchema } from "../validations/login";

export const useLogin = () =>
  useMutation<AuthResponse, ApiError, LoginSchema>({
    mutationKey: ["login"],
    mutationFn: authService.login
  });
