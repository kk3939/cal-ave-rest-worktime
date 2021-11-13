import * as holiday_jp from "@holiday-jp/holiday_jp";
import {
  checkContainedHoliday,
  returnHolidayNum,
  returnPreNextMonth,
  returnRemoveNationalHolidayTime,
  returnShouldWorkDate,
  returnShouldWorkTimeInPast,
} from "./function";
import { Holiday } from "./type";

export const main = (workTime: string, paidtime: string) => {
  const inputPaidTime = Number(paidtime);
  const inputWorkTime = Number(workTime);
  const today: Date = new Date();
  const perDayWorkTime = 8;
  // dayの番号で休日を表現（日曜と土曜）
  const holiday: number[] = [0, 6];

  const preMonth: Date = returnPreNextMonth(today).preMonth;
  const nextMonth: Date = returnPreNextMonth(today).nextMonth;

  // 先月10日から昨日までの経過日数
  const workedTime: number = Math.floor(
    (today.getTime() - preMonth.getTime()) / 86400000
  );
  console.log(`先月10日から昨日までで${workedTime}日経過しました。\n`);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~");

  // 土日の日数カウント
  const holidayNum: number = returnHolidayNum(workedTime, holiday);

  // 半端な部分の中に土日が入っているか検証し、入っていたらremainedDayInHolidayNumを加算
  const remainedDayInHolidayNum: number = checkContainedHoliday(
    workedTime,
    preMonth,
    holiday
  );

  // 減算すべき休日分の時間の合計
  const removeHolidayTime: number =
    (holidayNum + remainedDayInHolidayNum + inputPaidTime) * perDayWorkTime;

  // 前月から今日までの祝日を取得
  const nationalHolidaysArray: Holiday[] | null = holiday_jp.between(
    preMonth,
    today
  );

  // 祝日分の減算すべき値を取得して、コンソールに祝日一覧を出力
  const removeNationalHolidaysTime: number = returnRemoveNationalHolidayTime(
    nationalHolidaysArray,
    perDayWorkTime
  );

  // 今日までに働くべき合計の値を算出
  const shouldWorkTimeInPast: number = returnShouldWorkTimeInPast(
    perDayWorkTime,
    workedTime,
    removeHolidayTime,
    removeNationalHolidaysTime
  );

  console.log(`${shouldWorkTimeInPast}時間は働く必要がありました。`);

  // 来月までの締め日までの日数を出力
  const shouldWorkDate: number = returnShouldWorkDate(today, nextMonth);
  // 働く時間（減算すべき値はまだ引いていない）
  const shouldWorkTime: number = shouldWorkDate * perDayWorkTime;

  // 休日を計算し、今後働かなければいけない時間を算出
  const holidayNumfromTodayToNextMonth: number = returnHolidayNum(
    shouldWorkDate,
    holiday
  );
  const remainedHolidayNumfromTodayToNextMonth: number = checkContainedHoliday(
    shouldWorkDate,
    today,
    holiday
  );

  const shouldworkTimeForFuture: number =
    shouldWorkTime -
    (holidayNumfromTodayToNextMonth + remainedHolidayNumfromTodayToNextMonth) *
      perDayWorkTime;

  console.log(
    `次の10日の締め日までに働かなければいけない時間数は、${shouldworkTimeForFuture}時間です。`
  );

  const sumShouldWorkTime: number =
    shouldWorkTimeInPast + shouldworkTimeForFuture;

  // TODO:土日にコマンドを実行した際のエスケープ処理実装
  console.log(shouldWorkDate);
  console.log(holidayNumfromTodayToNextMonth);

  // これまで働いた時間を加味した今後働くべき時間
  const restShouldWorkTime: number = sumShouldWorkTime - inputWorkTime;
  console.log(
    `\n入力された値から計算した結果、\n残り${
      shouldWorkDate - holidayNumfromTodayToNextMonth
    }日間で、${restShouldWorkTime}時間働かなければいけません。`
  );

  // 残りの期間、1日あたり働かなければいけない平均の時間
  const restShouldWorkTimePerDay =
    restShouldWorkTime / (shouldWorkDate - holidayNumfromTodayToNextMonth);

  console.log(
    `すなわち、1日あたり平均${restShouldWorkTimePerDay}時間働かなければいけません。`
  );
};
