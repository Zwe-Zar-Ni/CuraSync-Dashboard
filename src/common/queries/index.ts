import { useMutation, useQuery } from '@tanstack/react-query';
import commonSerivce from '../services';
import queryClient from '@/common/api/queryClient';
import type { ApiError } from '../types';

export const useGetUserProfile = () =>
  useQuery({
    queryKey: ['user-me'],
    queryFn: () => commonSerivce.getUserProfile(),
    staleTime: 1000 * 60 * 10, //? 10 minutes
  });

export const useLogout = () =>
  useMutation<string, ApiError>({
    mutationKey: ['logout'],
    mutationFn: commonSerivce.logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-me'] });
    },
  });

export const useGetSpecializations = () =>
  useQuery({
    queryKey: ['public-specializations'],
    queryFn: () => commonSerivce.getSpecializations(),
  });
