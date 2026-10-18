import type { DoctorStatus } from "@/common/types";
import type { DoctorsFilterInputType } from "../validations/filter";

export function readFilters(params: URLSearchParams): DoctorsFilterInputType {
  return {
    search: params.get("search") ?? "",
    email: params.get("email") ?? "",
    phone_number: params.get("phone_number") ?? "",
    status: (params.get("status") as DoctorStatus) ?? "",
    page: params.get("page") ? Number(params.get("page")) : 1,
    per_page: params.get("per_page") ? Number(params.get("per_page")) : 10
  };
}

export function setFilters(params: DoctorsFilterInputType) {
  const next = new URLSearchParams();
  if (params.search) next.set("search", params.search);
  if (params.email) next.set("email", params.email);
  if (params.phone_number) next.set("phone_number", params.phone_number);
  if (params.status) next.set("status", params.status);
  if (params.page) next.set("page", params.page.toString());
  if (params.per_page) next.set("per_page", params.per_page.toString());
  return next;
}

export function extractFilters(
  params: DoctorsFilterInputType
): DoctorsFilterInputType {
  return {
    ...params,
    search: params.search && params.search.length ? params.search : undefined,
    email: params.email && params.email.length ? params.email : undefined,
    phone_number:
      params.phone_number && params.phone_number.length
        ? params.phone_number
        : undefined,
    status: params.status && params.status.length ? params.status : undefined,
    page: params.page && params.page > 0 ? params.page : 1,
    per_page: params.per_page && params.per_page > 0 ? params.per_page : 10
  };
}
