import type { ScheduleRequestStatus, ScheduleRequestType } from '../types';
import type { ScheduleRequestFilterInputType } from '../validations/filter';

export function readFilters(
  params: URLSearchParams,
): ScheduleRequestFilterInputType {
  return {
    doctor_id: params.get('doctor_id')
      ? Number(params.get('doctor_id'))
      : undefined,
    request_type: params.get('request_type')
      ? (params.get('request_type') as ScheduleRequestType)
      : undefined,
    status: params.get('status')
      ? (params.get('status') as ScheduleRequestStatus)
      : undefined,
    from_date: params.get('from_date') ?? undefined,
    to_date: params.get('to_date') ?? undefined,
    day_of_week:
      params.get('day_of_week') || params.get('day_of_week') === '0'
        ? Number(params.get('day_of_week'))
        : undefined,
    page: params.get('page') ? Number(params.get('page')) : 1,
    per_page: params.get('per_page') ? Number(params.get('per_page')) : 10,
  };
}

export function setFilters(params: ScheduleRequestFilterInputType) {
  const next = new URLSearchParams();
  if (params.doctor_id) next.set('doctor_id', params.doctor_id.toString());
  if (params.request_type)
    next.set('request_type', params.request_type.toString());
  if (params.status) next.set('status', params.status.toString());
  if (params.from_date) next.set('from_date', params.from_date);
  if (params.to_date) next.set('to_date', params.to_date);
  if (params.day_of_week || params.day_of_week === 0)
    next.set('day_of_week', params.day_of_week.toString());
  if (params.page) next.set('page', params.page.toString());
  if (params.per_page) next.set('per_page', params.per_page.toString());
  return next;
}

export function extractFilters(
  params: ScheduleRequestFilterInputType,
): ScheduleRequestFilterInputType {
  return {
    ...params,
    doctor_id: params.doctor_id ? params.doctor_id : undefined,
    request_type: params.request_type ? params.request_type : undefined,
    status: params.status ? params.status : undefined,
    from_date: params.from_date ? params.from_date : undefined,
    to_date: params.to_date ? params.to_date : undefined,
    day_of_week:
      params.day_of_week || params.day_of_week === 0
        ? params.day_of_week
        : undefined,
    page: params.page && params.page > 0 ? params.page : 1,
    per_page: params.per_page && params.per_page > 0 ? params.per_page : 10,
  };
}
