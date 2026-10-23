import { httpClient } from '@/common/api/apiClient';
import type { PaginatedResponse } from '@/common/types';
import type { ScheduleRequestFilterInputType } from '../validations/filter';
import type { UpdateScheduleRequestInputType } from '../validations/update';
import type { ScheduleRequest } from '../types';

class ScheduleRequestService {
  async getRequests(params: Partial<ScheduleRequestFilterInputType>) {
    const response = await httpClient.get('/admin/schedule-requests', {
      params,
    });
    return response.data as PaginatedResponse<ScheduleRequest>;
  }

  async getRequestDetails(id: number) {
    const response = await httpClient.get(`/admin/schedule-requests/${id}`);
    return response.data as ScheduleRequest;
  }

  async updateRequest(id: number, data: UpdateScheduleRequestInputType) {
    const response = await httpClient.put(
      `/admin/schedule-requests/${id}`,
      data,
    );
    return response.data as [];
  }
}

const scheduleRequestService = new ScheduleRequestService();
export default scheduleRequestService;
