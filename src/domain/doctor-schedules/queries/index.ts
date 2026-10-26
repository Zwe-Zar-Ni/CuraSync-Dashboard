import { useQuery } from '@tanstack/react-query';
import doctorScheduleService from '../services';

export const useGetDoctorSchedules = (params?: Record<string, unknown>) =>
  useQuery({
    queryKey: ['doctor-schedules', params],
    queryFn: () => doctorScheduleService.getDoctorSchedules(params),
  });
