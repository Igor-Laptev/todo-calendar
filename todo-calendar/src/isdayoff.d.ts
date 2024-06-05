declare module 'isdayoff' {
  export function getHolidays(
    year: string | number,
    month: string | number,
    day: string | number
  ): Promise<string>;
}
