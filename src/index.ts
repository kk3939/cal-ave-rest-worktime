import * as holiday_jp from "@holiday-jp/holiday_jp";
import {
  checkContainedHoliday,
  returnHolidayNum,
  returnPreNextMonth,
  returnRemoveNationalHolidayTime,
  returnShouldWorkDateNext,
  returnShouldWorkDatePre,
  returnShouldWorkTimeFuture,
  returnShouldWorkTimeInPast,
} from "./function";
import { Holiday, preNextMonth, Eight } from "./type";

export const main = (
  workTime: string,
  prePaidtime: string,
  fromNowAndOnPaidtime: string
) => {
  const inputFromNowAndOnPaidtime = Number(fromNowAndOnPaidtime);
  const inputPrePaidtime = Number(prePaidtime);
  const inputWorkTime = Number(workTime);
  const today: Date = new Date();
  const perDayWorkTime: Eight = 8;
  const holiday: number[] = [0, 6]; // dayの番号で休日を表現（日曜と土曜）
  const monthObj: preNextMonth = returnPreNextMonth(today);
  const preMonth: Date = monthObj.preMonth;
  const nextMonth: Date = monthObj.nextMonth;
  const workedDateCount: number = returnShouldWorkDatePre(today, preMonth);

  // 土日の日数カウント
  const holidayNum: number = returnHolidayNum(workedDateCount, holiday);

  // 半端な部分の中に土日が入っているか検証する
  const remainedDayInHolidayNum: number = checkContainedHoliday(
    workedDateCount,
    preMonth,
    holiday
  );

  // 減算すべき休日分の時間の合計
  const removeHolidayTime: number =
    (holidayNum + remainedDayInHolidayNum + inputPrePaidtime) * perDayWorkTime;

  // 前月から今日までの祝日を取得
  const nationalHolidaysArray: Holiday[] | null = holiday_jp.between(
    preMonth,
    today
  );

  // 祝日分の減算すべき値を取得
  const removeNationalHolidaysTime: number = returnRemoveNationalHolidayTime(
    nationalHolidaysArray,
    perDayWorkTime
  );

  // 今日までに働くべき合計の値を算出
  const shouldWorkTimeInPast: number = returnShouldWorkTimeInPast(
    perDayWorkTime,
    workedDateCount,
    removeHolidayTime,
    removeNationalHolidaysTime
  );

  console.log(`${shouldWorkTimeInPast}時間は働く必要がありました。`);

  // 来月までの締め日までの日数を出力
  const shouldWorkDate: number = returnShouldWorkDateNext(today, nextMonth);

  // 休日を計算し、今後働かなければいけない時間を算出
  const holidayNumfromTodayToNextMonth: number = returnHolidayNum(
    shouldWorkDate,
    holiday
  );

  // 半端な部分の中に土日が入っているか検証
  const remainedHolidayNumfromTodayToNextMonth: number = checkContainedHoliday(
    shouldWorkDate,
    today,
    holiday
  );

  // 今日から次の締め日までの祝日
  const nationalHolidaysArrayNext: Holiday[] | null = holiday_jp.between(
    today,
    nextMonth
  );

  // 今日から次の締め日までの祝日から計算される減算するべき時間
  const removeNationalHolidaysTimeNext: number =
    returnRemoveNationalHolidayTime(nationalHolidaysArrayNext, perDayWorkTime);

  // 減算するべき時間
  const removeHolidayTimeNext: number =
    (holidayNumfromTodayToNextMonth +
      remainedHolidayNumfromTodayToNextMonth +
      inputFromNowAndOnPaidtime) *
    perDayWorkTime;

  // 減算するべき時間を合計して今後働くべき時間を返す。
  const shouldworkTimeForFuture: number = returnShouldWorkTimeFuture(
    perDayWorkTime,
    shouldWorkDate,
    removeHolidayTimeNext,
    removeNationalHolidaysTimeNext
  );

  console.log(
    `次の10日の締め日までに働かなければいけない時間数は、${shouldworkTimeForFuture}時間です。`
  );

  // 今回の1ヶ月間で働くべき総合計の値
  const sumShouldWorkTime: number =
    shouldWorkTimeInPast + shouldworkTimeForFuture;

  // これまで働いた時間を加味した今後働くべき時間
  const remainedShouldWorkTime: number = sumShouldWorkTime - inputWorkTime;

  // 次の締め日までの残りの日数
  const remainedDayFromNowToNext: number =
    shouldWorkDate -
    holidayNumfromTodayToNextMonth -
    remainedHolidayNumfromTodayToNextMonth -
    inputFromNowAndOnPaidtime;

  console.log(
    `\n入力された値から計算した結果、\n残り${remainedDayFromNowToNext}日間で、${remainedShouldWorkTime}時間働かなければいけません。`
  );

  // 残りの期間、1日あたり働かなければいけない平均の時間
  const restShouldWorkAverageTimePerDay: number =
    remainedShouldWorkTime / remainedDayFromNowToNext;

  console.log(
    `すなわち、1日あたり平均${restShouldWorkAverageTimePerDay}時間働かなければいけません。`
  );
};
