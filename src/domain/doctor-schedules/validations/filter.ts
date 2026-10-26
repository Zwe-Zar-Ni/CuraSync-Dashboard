import { z } from 'zod';

export const DoctorSchedulesFilterValidator = z.object({
  day_of_week: z.number().optional(),
  is_active: z.boolean().optional(),
});

export type DoctorSchedulesFilterInputType = z.input<
  typeof DoctorSchedulesFilterValidator
>;

export function setDefaultDoctorSchedulesFilterValues(
  initial?: Partial<DoctorSchedulesFilterInputType>,
): DoctorSchedulesFilterInputType {
  return { ...initial };
}
