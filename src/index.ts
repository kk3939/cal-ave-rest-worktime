import * as holiday_jp from "@holiday-jp/holiday_jp";
import { returnRemoveNationalHolidayTime } from "./function";
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
// 土日の日数カウント
const holidayNum: number = Math.floor(workedTime / 7) * holiday.length;
// 半端な部分の中に土日が入っているか検証し、入っていたらremainedDayInHolidayNumを加算
const remainedDay: number = Math.floor(workedTime % 7);
let remainedDayInHolidayNum = 0;
if (remainedDay > 0) {
  const beginDay = preMonth.getDay();
  for (let i = 0; i < remainedDay; i++) {
    if (holiday.indexOf((beginDay + i) % 7) != -1) {
      remainedDayInHolidayNum++;
    }
  }
}
const removeHolidayTime: number =
  (holidayNum + remainedDayInHolidayNum) * perDayWorkTime;
const nationalHolidaysArray: Holiday[] | null = holiday_jp.between(
  preMonth,
  today
);

const removeNationalHolidaysTime = returnRemoveNationalHolidayTime(
  nationalHolidaysArray,
  perDayWorkTime
);

console.log();
console.log(
  `${
    Math.floor(perDayWorkTime * workedTime) -
    removeHolidayTime -
    removeNationalHolidaysTime
  }時間は働く必要がありました。`
);

const shouldWorkTime: number =
  (nextMonth.getTime() - today.getTime()) / 86400000;
console.log(
  `次回の10日までに${Math.floor(shouldWorkTime)}時間は働く必要があります。`
);
