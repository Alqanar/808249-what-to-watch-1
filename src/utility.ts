const getMonthName = (date: string): string => (
  new Date(date).toLocaleString(`en-us`, {month: `long`})
);

const getMonth = (date: string): number => (
  new Date(date).getMonth() + 1
);

const getDay = (date: string): number => (
  new Date(date).getDate()
);

const getYear = (date: string): number => (
  new Date(date).getFullYear()
);

export const getDate = (date: string): string => (
  `${getMonthName(date)} ${getDay(date)}, ${getYear(date)}`
);

export const getDateTime = (date: string): string => (
  `${getYear(date)}-${getMonth(date)}-${getDay(date)}`
);
