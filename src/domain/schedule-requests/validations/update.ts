import { z } from 'zod';

export const UpdateScheduleRequestValidator = z.object({
  status: z.enum(['APPROVED', 'REJECTED']),
  admin_note: z.string().min(1, 'Admin note is required'),
});

export type UpdateScheduleRequestInputType = z.infer<
  typeof UpdateScheduleRequestValidator
>;
