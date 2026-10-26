import type { DoctorSchedulesFilterInputType } from '../validations/filter';

export function readFilters(
  params: URLSearchParams,
): DoctorSchedulesFilterInputType {
  const dayOfWeek = params.get('day_of_week');
  const isActive = params.get('is_active');

  return {
    day_of_week: dayOfWeek || dayOfWeek === '0' ? Number(dayOfWeek) : undefined,
    is_active: isActive === '1' ? true : isActive === '0' ? false : undefined,
  };
}

export function setFilters(params: DoctorSchedulesFilterInputType) {
  const next = new URLSearchParams();
  if (params.day_of_week || params.day_of_week === 0)
    next.set('day_of_week', params.day_of_week.toString());
  if (params.is_active) next.set('is_active', '1');
  if (!params.is_active) next.set('is_active', '0');
  return next;
}

export function extractFilters(
  params: DoctorSchedulesFilterInputType,
): Partial<DoctorSchedulesFilterInputType> {
  const result: Record<string, unknown> = {};
  if (params.day_of_week || params.day_of_week === 0)
    result.day_of_week = params.day_of_week;
  if (params.is_active) result.is_active = 1;
  if (!params.is_active) result.is_active = 0;
  return result;
}
