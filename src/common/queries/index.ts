import { useMutation, useQuery } from '@tanstack/react-query';
import commonSerivce from '../services';
import queryClient from '@/common/api/queryClient';
import type { ApiError } from '../types';

export const useGetUserProfile = () =>
  useQuery({
    queryKey: ['user-me'],
    queryFn: () => commonSerivce.getUserProfile(),
  });

export const useLogout = () =>
  useMutation<string, ApiError, undefined>({
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
