import { httpClient } from "@/common/api/apiClient";
import type { UserProfile } from "../types";

class CommonSerivce {
  async getUserProfile() {
    const response = await httpClient.get("/me");
    return response.data as { user: UserProfile };
  }
  async logout() {
    const response = await httpClient.post("/logout");
    return response.data;
  }
}

const commonSerivce = new CommonSerivce();
export default commonSerivce;
