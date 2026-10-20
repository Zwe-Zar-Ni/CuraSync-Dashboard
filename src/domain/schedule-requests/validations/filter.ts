import { z } from "zod";

export const ScheduleRequestsFilterValidator = z.object({
  page: z.number().optional(),
  per_page: z.number().optional(),
  doctor_id: z.number().optional(),
  request_type: z.enum(["CREATE", "UPDATE", "DELETE"]).optional(),
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]).optional(),
  from_date: z.string().optional(),
  to_date: z.string().optional(),
  day_of_week: z.number().optional()
});

export type ScheduleRequestFilterInputType = z.input<
  typeof ScheduleRequestsFilterValidator
>;

const DEFAULT_VALUES: ScheduleRequestFilterInputType = {
  page: 1,
  per_page: 10
};

export function setDefaultScheduleRequestsFilterValues(
  initial?: Partial<ScheduleRequestFilterInputType>
): ScheduleRequestFilterInputType {
  return { ...DEFAULT_VALUES, ...initial };
}
