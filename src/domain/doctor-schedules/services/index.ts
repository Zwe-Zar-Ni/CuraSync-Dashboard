import { httpClient } from '@/common/api/apiClient';
import type { DoctorSchedule } from '../types';

class DoctorScheduleService {
  async getDoctorSchedules(params?: Record<string, unknown>) {
    const response = await httpClient.get('/admin/doctor-schedules', {
      params,
    });
    return response.data as DoctorSchedule[];
  }
}

const doctorScheduleService = new DoctorScheduleService();
export default doctorScheduleService;
