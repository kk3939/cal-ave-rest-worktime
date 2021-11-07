import { Holiday } from "./type";

export const formatDate = (dt: Date): string => {
  const y = dt.getFullYear();
  const m = `00${dt.getMonth() + 1}`.slice(-2);
  const d = `00${dt.getDate()}`.slice(-2);
  return `${y}-${m}-${d}`;
};

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
  workedTime: number,
  month: Date,
  holiday: number[]
) => {
  const remainedDay: number = Math.floor(workedTime % 7);
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
