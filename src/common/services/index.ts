import { httpClient } from "@/common/api/apiClient";
import type { Specialization, UserProfile } from "../types";

class CommonSerivce {
  async getUserProfile() {
    const response = await httpClient.get("/me");
    return response.data as UserProfile;
  }
  async logout() {
    const response = await httpClient.post("/logout");
    return response.data;
  }
  async getSpecializations() {
    const response = await httpClient.get<Specialization[]>(
      "/public/specializations"
    );
    return response.data;
  }
}

const commonSerivce = new CommonSerivce();
export default commonSerivce;
