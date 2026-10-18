import { httpClient } from "@/common/api/apiClient";
import type { DoctorProfile, PaginatedResponse } from "@/common/types";
import type { DoctorsFilterInputType } from "../validations/filter";

class DoctorService {
  async getDoctors(params: Partial<DoctorsFilterInputType>) {
    const response = await httpClient.get("/admin/doctors", {
      params
    });
    return response.data as PaginatedResponse<DoctorProfile>;
  }
}

const doctorService = new DoctorService();
export default doctorService;
