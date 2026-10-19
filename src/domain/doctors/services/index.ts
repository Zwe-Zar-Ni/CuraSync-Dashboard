import { httpClient } from "@/common/api/apiClient";
import type { PaginatedResponse } from "@/common/types";
import type { DoctorsFilterInputType } from "../validations/filter";
import type { DoctorResource } from "../types";

class DoctorService {
  async getDoctors(params: Partial<DoctorsFilterInputType>) {
    const response = await httpClient.get("/admin/doctors", {
      params
    });
    return response.data as PaginatedResponse<DoctorResource>;
  }
  async getDoctor(id: number) {
    const response = await httpClient.get(`/admin/doctors/${id}`);
    return response.data as DoctorResource;
  }
}

const doctorService = new DoctorService();
export default doctorService;
