import { useQuery } from "@tanstack/react-query";
import doctorService from "../services";
import type { DoctorsFilterInputType } from "../validations/filter";

export const useGetDoctors = (params: Partial<DoctorsFilterInputType>) =>
  useQuery({
    queryKey: ["doctor-profiles", params],
    queryFn: () => doctorService.getDoctors(params)
  });

export const useGetDoctor = (id: number) =>
  useQuery({
    queryKey: ["doctor-profile-details", id],
    queryFn: () => doctorService.getDoctor(id)
  });
