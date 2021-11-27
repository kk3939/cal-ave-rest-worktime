import { Holiday, preNextMonth } from "./type";

export const returnRemoveNationalHolidayTime = (
  nationalHolidaysArray: Holiday[] | null,
  perDayWorkTime: number
): number => {
  if (nationalHolidaysArray === null) {
    return 0;
  }
  if (nationalHolidaysArray.length > 0) {
    const removeNationalHolidayTime: number =
      nationalHolidaysArray.length * perDayWorkTime;
    console.log(`祝日は${nationalHolidaysArray.length}日ありました。`);
    nationalHolidaysArray.forEach((element) => {
      console.log(`- ${element["name"]}`);
    });
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~\n");
    return removeNationalHolidayTime;
  }
  console.log("対象期間に祝日はありませんでした。");
  return 0;
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

  // 一日ずれているから10日を表すために11に設定
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

export const returnHolidayNum = (
  workedDateCount: number,
  holiday: number[]
) => {
  return Math.floor(workedDateCount / 7) * holiday.length;
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

export const returnShouldWorkDate = (today: Date, nextMonth: Date) => {
  return Math.floor((nextMonth.getTime() - today.getTime()) / 86400000);
};
