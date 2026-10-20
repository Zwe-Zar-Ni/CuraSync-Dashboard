import { useQuery } from "@tanstack/react-query";
import scheduleRequestService from "../services";
import type { ScheduleRequestFilterInputType } from "../validations/filter";

export function useGetRequests(
  params: Partial<ScheduleRequestFilterInputType>
) {
  return useQuery({
    queryKey: ["schedule-requests", params],
    queryFn: () => scheduleRequestService.getRequests(params)
  });
}

export function useGetRequestDetails(id: number) {
  return useQuery({
    queryKey: ["schedule-requests", id],
    queryFn: () => scheduleRequestService.getRequestDetails(id)
  });
}
