import * as holiday_jp from "@holiday-jp/holiday_jp";
import {
  checkContainedHoliday,
  returnRemoveNationalHolidayTime,
} from "./function";
import { Holiday } from "./type";

const today: Date = new Date();
const perDayWorkTime = 8;
// dayの番号で休日を表現（日曜と土曜）
const holiday = [0, 6];
// 一日ずれているから10日を表すために11日に設定
const preMonth: Date = new Date(today.getFullYear(), today.getMonth() - 1, 11);
// 10日を含めたいから12に設定
const nextMonth: Date = new Date(today.getFullYear(), today.getMonth(), 12);
// 先月10日から昨日までの経過日数
const workedTime: number = Math.floor(
  (today.getTime() - preMonth.getTime()) / 86400000
);
console.log(`先月10日から昨日までで${workedTime}日経過しました。`);
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~");
// 土日の日数カウント
const holidayNum: number = Math.floor(workedTime / 7) * holiday.length;
// 半端な部分の中に土日が入っているか検証し、入っていたらremainedDayInHolidayNumを加算
const remainedDayInHolidayNum: number = checkContainedHoliday(
  workedTime,
  preMonth,
  holiday
);
const removeHolidayTime: number =
  (holidayNum + remainedDayInHolidayNum) * perDayWorkTime;
const nationalHolidaysArray: Holiday[] | null = holiday_jp.between(
  preMonth,
  today
);
const removeNationalHolidaysTime: number = returnRemoveNationalHolidayTime(
  nationalHolidaysArray,
  perDayWorkTime
);

const shouldWorkTimeInPast: number =
  Math.floor(perDayWorkTime * workedTime) -
  removeHolidayTime -
  removeNationalHolidaysTime;

console.log(`${shouldWorkTimeInPast}時間は働く必要がありました。`);

const shouldWorkDate: number = Math.floor(
  (nextMonth.getTime() - today.getTime()) / 86400000
);
const shoudWorkTime = shouldWorkDate * perDayWorkTime;
const holidayNumfromTodayToNextMonth: number = checkContainedHoliday(
  shouldWorkDate,
  today,
  holiday
);
const shouldworkTimeForFuture: number =
  shoudWorkTime - holidayNumfromTodayToNextMonth * perDayWorkTime;
console.log(
  `次の10日の締め日までに働かなければいけない時間数は、${shouldworkTimeForFuture}時間です。`
);

const sumShouldWorkTime: number =
  shouldWorkTimeInPast + shouldworkTimeForFuture;
// TODO:CLIツールにするためにこの部分を入力受け付けるようにする。
const inputWorkTime = 160;
const restShouldWorkTime: number = sumShouldWorkTime - inputWorkTime;
const restShouldWorkTimePerDay =
  restShouldWorkTime / (shouldWorkDate - holidayNumfromTodayToNextMonth);

console.log(
  `1日あたり平均${restShouldWorkTimePerDay}時間働かなければいけません。`
);
