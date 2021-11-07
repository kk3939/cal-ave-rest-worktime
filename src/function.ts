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
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~");
    return removeNationalHolidayTime;
  }
  console.log("対象期間に祝日はありませんでした。");
  return 0;
};
