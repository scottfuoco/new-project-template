/* eslint-disable @typescript-eslint/unbound-method */
import { default as initialDayjs } from "dayjs";
import duration from "dayjs/plugin/duration.js";
import relativeTime from "dayjs/plugin/relativeTime.js";
import minMax from "dayjs/plugin/minMax";
import customParseFormat from "dayjs/plugin/customParseFormat";

initialDayjs.extend(duration);
initialDayjs.extend(relativeTime);
initialDayjs.extend(minMax);
initialDayjs.extend(customParseFormat);
export const dayjs = initialDayjs;

export const removeNonNumericCharacters = (value: string) =>
  value.replaceAll(/[^\d.]+/g, "");

export const formatArticleDate = (date: Date | number) =>
  dayjs(date).format("MMM-DD-YYYY");

export const formatArticleHeroDate = (date: Date | number) =>
  dayjs(date).format("MMMM DD, YYYY");
