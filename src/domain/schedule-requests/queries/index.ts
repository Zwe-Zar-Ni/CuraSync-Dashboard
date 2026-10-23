import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import scheduleRequestService from '../services';
import type { ScheduleRequestFilterInputType } from '../validations/filter';
import type { UpdateScheduleRequestInputType } from '../validations/update';
import type { ApiError } from '@/common/types';

export function useGetRequests(
  params: Partial<ScheduleRequestFilterInputType>,
) {
  return useQuery({
    queryKey: ['schedule-requests', params],
    queryFn: () => scheduleRequestService.getRequests(params),
  });
}

export function useGetRequestDetails(id: number) {
  return useQuery({
    queryKey: ['schedule-requests', id],
    queryFn: () => scheduleRequestService.getRequestDetails(id),
  });
}

export function useUpdateScheduleRequest() {
  const queryClient = useQueryClient();

  return useMutation<
    [],
    ApiError,
    { id: number; data: UpdateScheduleRequestInputType }
  >({
    mutationFn: ({ id, data }) =>
      scheduleRequestService.updateRequest(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedule-requests'] });
    },
  });
}
