import { parse } from "https://deno.land/std@0.193.0/datetime/mod.ts";

const TASK_DATE_FORMAT = "yyyyMMddTHHmmssZ";

const isToday = (date: string) => {
  const endDate = parse(date, TASK_DATE_FORMAT).valueOf();
  const todayStart = new Date().setHours(0, 0, 0, 0);
  const todayEnd = new Date().setHours(23, 59, 59, 999);
  return endDate >= todayStart && endDate <= todayEnd;
};
