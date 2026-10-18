import { z } from "zod";

export const DoctorsFilterValidator = z.object({
  page: z.number().optional(),
  per_page: z.number().optional(),
  search: z.string().optional(),
  email: z.string().optional(),
  phone_number: z.string().optional(),
  status: z
    .enum(["ACTIVE", "PENDING_VERIFICATION", "INACTIVE", "SUSPENDED", ""])
    .optional()
});

export type DoctorsFilterInputType = z.input<typeof DoctorsFilterValidator>;

const DEFAULT_VALUES: DoctorsFilterInputType = {
  search: "",
  email: "",
  phone_number: "",
  status: undefined,
  page: 1,
  per_page: 10
};

export function setDefaultDoctorsFilterValues(
  initial?: Partial<DoctorsFilterInputType>
): DoctorsFilterInputType {
  return { ...DEFAULT_VALUES, ...initial };
}
