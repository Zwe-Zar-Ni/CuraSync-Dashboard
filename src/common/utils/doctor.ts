export const DAYS = [
  {
    en: 'Sunday',
    mm: 'တနင်္ဂနွေ',
  },
  {
    en: 'Monday',
    mm: 'တနင်္လာ',
  },
  {
    en: 'Tuesday',
    mm: 'အင်္ဂါ',
  },
  {
    en: 'Wednesday',
    mm: 'ဗုဒ္ဓဟူး',
  },
  {
    en: 'Thursday',
    mm: 'ကြာသပတေး',
  },
  {
    en: 'Friday',
    mm: 'သောကြာ',
  },
  {
    en: 'Saturday',
    mm: 'စနေ',
  },
] as const;

export const getDayOfWeekLabel = (day: number, lang: 'en' | 'mm' = 'en') => {
  const dayOfWeek = DAYS[day] ?? undefined;
  if (!dayOfWeek) return `Day ${day}`;
  return dayOfWeek[lang];
};
