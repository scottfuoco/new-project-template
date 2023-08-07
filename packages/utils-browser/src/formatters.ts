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

export { default as dayjs } from "dayjs";
