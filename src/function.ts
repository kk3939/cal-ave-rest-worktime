import { Holiday, preNextMonth } from "./type";

/**
 * 前の10日から昨日までの経過日数を返す関数
 * @param {Date} today
 * @param {Date} preMonth
 * @return {number} 先月10日から昨日までの経過日数
 */
export const returnShouldWorkDatePre = (
  today: Date,
  preMonth: Date
): number => {
  return Math.floor((today.getTime() - preMonth.getTime()) / 86400000);
};

/**
 * 前月の締め日と次の締め日を出力
 * @param {Date} today
 * @return {preNextMonth} オブジェクトで前の締め日後の11日と次の締め日10日を返す
 */
export const returnPreNextMonth = (today: Date): preNextMonth => {
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

  return {
    preMonth: preMonth,
    nextMonth: nextMonth,
  };
};

/**
 * 休日の数を出力、半端な数は含めない
 * @param {number} workedDateCount
 * @param {number[]} holiday
 * @return {number} 休日の数(割り切れる部分での数なので、checkcontainedholidayと併用する必要あり)
 */
export const returnHolidayNum = (
  workedDateCount: number,
  holiday: number[]
): number => {
  return Math.floor(workedDateCount / 7) * holiday.length;
};

export const checkContainedHoliday = (
  workedDateCount: number,
  month: Date,
  holiday: number[]
) => {
  const remainedDay: number = Math.floor(workedDateCount % 7);
  let remainedDayInHolidayNum = 0;
  if (remainedDay > 0) {
    const beginDay = month.getDay();
    for (let i = 0; i < remainedDay; i++) {
      if (holiday.indexOf((beginDay + i) % 7) != -1) {
        remainedDayInHolidayNum++;
      }
    }
  }
  return remainedDayInHolidayNum;
};

export const returnRemoveNationalHolidayTime = (
  nationalHolidaysArray: Holiday[] | null,
  perDayWorkTime: number
): number => {
  if (nationalHolidaysArray === null) {
    return 0;
  }
  if (nationalHolidaysArray.length === 0) {
    return 0;
  }
  const removeNationalHolidayTime: number =
    nationalHolidaysArray.length * perDayWorkTime;
  return removeNationalHolidayTime;
};

export const returnShouldWorkTimeInPast = (
  perDayWorkTime: number,
  workedDateCount: number,
  removeHolidayTime: number,
  removeNationalHolidaysTime: number
) => {
  return (
    Math.floor(perDayWorkTime * workedDateCount) -
    removeHolidayTime -
    removeNationalHolidaysTime
  );
};

export const returnShouldWorkDateNext = (today: Date, nextMonth: Date) => {
  return Math.floor((nextMonth.getTime() - today.getTime()) / 86400000);
};

export const returnShouldWorkTimeFuture = (
  perDayWorkTime: number,
  shouldWorkDate: number,
  removeHolidayTimeNext: number,
  removeNationalHolidaysTimeNext: number
) => {
  return (
    Math.floor(perDayWorkTime * shouldWorkDate) -
    removeHolidayTimeNext -
    removeNationalHolidaysTimeNext
  );
};
