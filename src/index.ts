import * as holiday_jp from "@holiday-jp/holiday_jp";
import {
  checkContainedHoliday,
  returnRemoveNationalHolidayTime,
} from "./function";
import { Holiday } from "./type";

export const main = (workTime: string) => {
  const inputWorkTime = Number(workTime);
  const today: Date = new Date();
  const perDayWorkTime = 8;
  // dayの番号で休日を表現（日曜と土曜）
  const holiday = [0, 6];

  // 10日以前と以後で基準とする10日が異なるため、条件分岐で設定。
  let preDigit: number;
  let nextDigit: number;
  if (today.getDate() < 10) {
    preDigit = -1;
    nextDigit = 0;
  } else {
    preDigit = 0;
    nextDigit = 1;
  }

  // 一日ずれているから10日を表すために11日に設定
  const preMonth: Date = new Date(
    today.getFullYear(),
    today.getMonth() + preDigit,
    11
  );

  // 10日を含めたいから12に設定
  const nextMonth: Date = new Date(
    today.getFullYear(),
    today.getMonth() + nextDigit,
    12
  );
  console.log(preMonth, nextMonth);

  // 先月10日から昨日までの経過日数
  const workedTime: number = Math.floor(
    (today.getTime() - preMonth.getTime()) / 86400000
  );
  console.log(`先月10日から昨日までで${workedTime}日経過しました。\n`);
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
  const restShouldWorkTime: number = sumShouldWorkTime - inputWorkTime;
  console.log(
    `\n入力された値から計算した結果、\n残り${
      shouldWorkDate - holidayNumfromTodayToNextMonth
    }日間で、${restShouldWorkTime}時間働かなければいけません。`
  );

  const restShouldWorkTimePerDay =
    restShouldWorkTime / (shouldWorkDate - holidayNumfromTodayToNextMonth);

  console.log(
    `すなわち、1日あたり平均${restShouldWorkTimePerDay}時間働かなければいけません。`
  );
};
