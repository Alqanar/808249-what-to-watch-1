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

const addZero = (number: number): string =>
  String(number).padStart(2, `0`);

export const formatTime = (time: number): string => {
  const hours = Math.floor(time / 3600);
  const timeWithoutHours = time - hours * 3600;
  const minutes = Math.floor(timeWithoutHours / 60);
  const seconds = Math.floor(timeWithoutHours % 60);

  return `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
};
