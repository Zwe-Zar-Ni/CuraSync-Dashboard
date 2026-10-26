import { useMemo } from 'react';
import type { DoctorSchedule } from '../types';

type Props = {
  schedules: DoctorSchedule[];
};

type PositionedSchedule = DoctorSchedule & {
  top: number;
  height: number;
  left: number;
  width: number;
};

type ScheduleInterval = {
  schedule: DoctorSchedule;
  start: number;
  end: number;
};

const MINUTES_PER_DAY = 24 * 60;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;

const HOUR_HEIGHT_CLASS = 'h-16';

/**
 * Converts an HH:mm or HH:mm:ss time string to minutes since midnight.
 * Returns null if the time is invalid.
 */
const timeToMinutes = (time: string): number | null => {
  const match = /^([01]\d|2[0-3]):([0-5]\d)(?::[0-5]\d)?$/.exec(time);

  if (!match) {
    return null;
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  return hours * MINUTES_PER_HOUR + minutes;
};

/**
 * Converts minutes since midnight to a percentage of the 24-hour timeline.
 */
const toPercentage = (minutes: number): number =>
  (minutes / MINUTES_PER_DAY) * 100;

/**
 * Converts a schedule into a validated interval.
 * Overnight schedules are not supported.
 */
const toInterval = (schedule: DoctorSchedule): ScheduleInterval | null => {
  const start = timeToMinutes(schedule.start_time);
  const end = timeToMinutes(schedule.end_time);

  if (start === null || end === null || end <= start) {
    return null;
  }

  return { schedule, start, end };
};

/**
 * Positions schedules within connected overlap clusters.
 *
 * Schedules are sorted by start time, grouped into overlap clusters,
 * and assigned to the first available column within each cluster.
 */
const layoutSchedules = (schedules: DoctorSchedule[]): PositionedSchedule[] => {
  const intervals = schedules
    .map(toInterval)
    .filter((interval): interval is ScheduleInterval => interval !== null)
    .sort(
      (a, b) =>
        a.start - b.start || a.end - b.end || a.schedule.id - b.schedule.id,
    );

  const result: PositionedSchedule[] = [];

  let cluster: ScheduleInterval[] = [];
  let clusterEnd = -1;

  const flushCluster = () => {
    if (cluster.length === 0) {
      return;
    }

    // Track the end time of the last schedule assigned to each column.
    const columnEnds: number[] = [];

    const assignments: Array<{
      interval: ScheduleInterval;
      column: number;
    }> = [];

    for (const interval of cluster) {
      // Reuse the first column whose previous schedule has ended.
      let column = columnEnds.findIndex((end) => end <= interval.start);

      if (column === -1) {
        column = columnEnds.length;
        columnEnds.push(interval.end);
      } else {
        columnEnds[column] = interval.end;
      }

      assignments.push({ interval, column });
    }

    const columnCount = columnEnds.length;
    const columnWidth = 100 / columnCount;

    for (const { interval, column } of assignments) {
      result.push({
        ...interval.schedule,
        top: toPercentage(interval.start),
        height: toPercentage(interval.end - interval.start),
        left: column * columnWidth,
        width: columnWidth,
      });
    }

    cluster = [];
    clusterEnd = -1;
  };

  for (const interval of intervals) {
    // Start a new cluster when the previous cluster has ended.
    if (cluster.length > 0 && interval.start >= clusterEnd) {
      flushCluster();
    }

    cluster.push(interval);
    clusterEnd = Math.max(clusterEnd, interval.end);
  }

  flushCluster();

  return result;
};

const DoctorSchedulesList = ({ schedules }: Props) => {
  const positionedSchedules = useMemo(
    () => layoutSchedules(schedules),
    [schedules],
  );

  const hours = Array.from({ length: HOURS_PER_DAY }, (_, hour) => hour);

  return (
    <div className="mt-4 flex overflow-hidden rounded-md border border-border">
      {/* Time labels */}
      <div className="w-16 shrink-0 border-r border-border">
        {hours.map((hour) => (
          <div
            key={hour}
            className={`${HOUR_HEIGHT_CLASS} flex items-center justify-center border-b border-border px-2 py-1 text-xs text-muted-foreground`}
          >
            {`${String(hour).padStart(2, '0')}:00`}
          </div>
        ))}
      </div>

      {/* Schedule timeline */}
      <div className="relative min-w-0 flex-1">
        {hours.map((hour) => (
          <div
            key={hour}
            className={`${HOUR_HEIGHT_CLASS} border-b border-border`}
          />
        ))}

        {positionedSchedules.map((schedule) => (
          <div
            key={schedule.id}
            className="absolute overflow-hidden rounded-md border border-primary/30 bg-primary/10 p-2 text-xs"
            style={{
              top: `${schedule.top}%`,
              height: `${schedule.height}%`,
              left: `calc(${schedule.left}% + 2px)`,
              width: `calc(${schedule.width}% - 4px)`,
            }}
          >
            <h2 className="truncate font-medium text-text-primary/90">
              {schedule.name}
            </h2>

            <p className="truncate text-muted-foreground">
              {schedule.start_time.slice(0, 5)} –{' '}
              {schedule.end_time.slice(0, 5)}
            </p>

            <p className="truncate text-muted-foreground">
              Slot duration: {schedule.slot_duration_minutes} minutes
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorSchedulesList;
