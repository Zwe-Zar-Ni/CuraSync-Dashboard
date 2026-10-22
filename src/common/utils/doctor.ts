export const DAYS = [
  {
    en: 'Sunday',
    mm: 'Sunday',
  },
  {
    en: 'Monday',
    mm: 'Monday',
  },
  {
    en: 'Tuesday',
    mm: 'Tuesday',
  },
  {
    en: 'Wednesday',
    mm: 'Wednesday',
  },
  {
    en: 'Thursday',
    mm: 'Thursday',
  },
  {
    en: 'Friday',
    mm: 'Friday',
  },
  {
    en: 'Saturday',
    mm: 'Saturday',
  },
] as const;

export const getDayOfWeekLabel = (day: number, lang: 'en' | 'mm' = 'en') => {
  const dayOfWeek = DAYS[day] ?? undefined;
  if (!dayOfWeek) return `Day ${day}`;
  return dayOfWeek[lang];
};
