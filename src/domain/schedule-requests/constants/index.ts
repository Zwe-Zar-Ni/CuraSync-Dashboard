import type { ScheduleRequestStatus, ScheduleRequestType } from "../types";

export const SCHEDULE_REQUEST_STATUSES: ScheduleRequestStatus[] = [
  "PENDING",
  "APPROVED",
  "REJECTED"
];

export const SCHEDULE_REQUEST_TYPES: ScheduleRequestType[] = [
  "CREATE",
  "UPDATE",
  "DELETE"
];

export const DAYS_OF_WEEK = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" }
];

export function dayOfWeekLabel(value: number): string {
  return (
    DAYS_OF_WEEK.find((day) => day.value === value)?.label ?? String(value)
  );
}
