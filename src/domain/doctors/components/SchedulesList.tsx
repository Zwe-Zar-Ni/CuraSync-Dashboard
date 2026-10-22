import type { Schedule } from '@/common/types/doctor';
import { getDayOfWeekLabel } from '@/common/utils/doctor';

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
              {getDayOfWeekLabel(slot.day_of_week, 'en')}
            </p>
            <p className="text-xs text-muted-foreground">
              {slot.slot_duration_minutes} min slots
            </p>
          </div>
          <span className="whitespace-nowrap text-sm text-muted-foreground">
            {slot.start_time} – {slot.end_time}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default SchedulesList;
