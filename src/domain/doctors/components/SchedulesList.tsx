import type { Schedule } from '@/common/types/doctor';

const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const formatTime = (time: string) => {
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, '0')} ${period}`;
};

const SchedulesList = ({ schedules }: { schedules: Schedule[] }) => {
  if (schedules.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No schedule available.</p>
    );
  }

  return (
    <ul className="divide-y">
      {schedules.map((slot) => (
        <li
          key={slot.id}
          className="flex items-center justify-between gap-3 py-2 first:pt-0 last:pb-0"
        >
          <div>
            <p className="text-sm font-medium">
              {DAYS[slot.day_of_week] ?? `Day ${slot.day_of_week}`}
            </p>
            <p className="text-xs text-muted-foreground">
              {slot.slot_duration_minutes} min slots
            </p>
          </div>
          <span className="whitespace-nowrap text-sm text-muted-foreground">
            {formatTime(slot.start_time)} – {formatTime(slot.end_time)}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default SchedulesList;
