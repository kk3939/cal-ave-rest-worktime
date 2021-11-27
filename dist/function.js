"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnShouldWorkDate = exports.returnShouldWorkTimeInPast = exports.returnHolidayNum = exports.returnPreNextMonth = exports.checkContainedHoliday = exports.returnRemoveNationalHolidayTime = void 0;
const returnRemoveNationalHolidayTime = (nationalHolidaysArray, perDayWorkTime) => {
    if (nationalHolidaysArray === null) {
        return 0;
    }
    if (nationalHolidaysArray.length > 0) {
        const removeNationalHolidayTime = nationalHolidaysArray.length * perDayWorkTime;
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
exports.returnRemoveNationalHolidayTime = returnRemoveNationalHolidayTime;
const checkContainedHoliday = (workedDateCount, month, holiday) => {
    const remainedDay = Math.floor(workedDateCount % 7);
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
exports.checkContainedHoliday = checkContainedHoliday;
const returnPreNextMonth = (today) => {
    // 10日以前と以後で基準とする10日が異なるため、条件分岐で設定。
    let preDigit;
    let nextDigit;
    if (today.getDate() < 10) {
        preDigit = -1;
        nextDigit = 0;
    }
    else {
        preDigit = 0;
        nextDigit = 1;
    }
    // 一日ずれているから10日を表すために11に設定
    const preMonth = new Date(today.getFullYear(), today.getMonth() + preDigit, 11);
    // 10日を含めたいから12に設定
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + nextDigit, 12);
    return {
        preMonth: preMonth,
        nextMonth: nextMonth,
    };
};
exports.returnPreNextMonth = returnPreNextMonth;
const returnHolidayNum = (workedDateCount, holiday) => {
    return Math.floor(workedDateCount / 7) * holiday.length;
};
exports.returnHolidayNum = returnHolidayNum;
const returnShouldWorkTimeInPast = (perDayWorkTime, workedDateCount, removeHolidayTime, removeNationalHolidaysTime) => {
    return (Math.floor(perDayWorkTime * workedDateCount) -
        removeHolidayTime -
        removeNationalHolidaysTime);
};
exports.returnShouldWorkTimeInPast = returnShouldWorkTimeInPast;
const returnShouldWorkDate = (today, nextMonth) => {
    return Math.floor((nextMonth.getTime() - today.getTime()) / 86400000);
};
exports.returnShouldWorkDate = returnShouldWorkDate;
//# sourceMappingURL=function.js.map