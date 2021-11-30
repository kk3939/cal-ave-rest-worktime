"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnShouldWorkTimeFuture = exports.returnShouldWorkDateNext = exports.returnShouldWorkTimeInPast = exports.returnRemoveNationalHolidayTime = exports.checkContainedHoliday = exports.returnHolidayNum = exports.returnPreNextMonth = exports.returnShouldWorkDatePre = void 0;
/**
 * 前の10日から昨日までの経過日数を返す関数
 * @param {Date} today
 * @param {Date} preMonth
 * @return {number} 先月10日から昨日までの経過日数
 */
const returnShouldWorkDatePre = (today, preMonth) => {
    return Math.floor((today.getTime() - preMonth.getTime()) / 86400000);
};
exports.returnShouldWorkDatePre = returnShouldWorkDatePre;
/**
 * 前月の締め日と次の締め日を出力
 * @param {Date} today
 * @return {preNextMonth} オブジェクトで前の締め日後の11日と次の締め日10日を返す
 */
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
    // 一日ずれているから10日を表すために11日に設定
    const preMonth = new Date(today.getFullYear(), today.getMonth() + preDigit, 11);
    // 10日を含めたいから12に設定
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + nextDigit, 12);
    console.log(preMonth);
    console.log(nextMonth);
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
const returnRemoveNationalHolidayTime = (nationalHolidaysArray, perDayWorkTime) => {
    if (nationalHolidaysArray === null) {
        return 0;
    }
    if (nationalHolidaysArray.length === 0) {
        return 0;
    }
    const removeNationalHolidayTime = nationalHolidaysArray.length * perDayWorkTime;
    return removeNationalHolidayTime;
};
exports.returnRemoveNationalHolidayTime = returnRemoveNationalHolidayTime;
const returnShouldWorkTimeInPast = (perDayWorkTime, workedDateCount, removeHolidayTime, removeNationalHolidaysTime) => {
    return (Math.floor(perDayWorkTime * workedDateCount) -
        removeHolidayTime -
        removeNationalHolidaysTime);
};
exports.returnShouldWorkTimeInPast = returnShouldWorkTimeInPast;
const returnShouldWorkDateNext = (today, nextMonth) => {
    return Math.floor((nextMonth.getTime() - today.getTime()) / 86400000);
};
exports.returnShouldWorkDateNext = returnShouldWorkDateNext;
const returnShouldWorkTimeFuture = (perDayWorkTime, shouldWorkDate, removeHolidayTimeNext, removeNationalHolidaysTimeNext) => {
    return (Math.floor(perDayWorkTime * shouldWorkDate) -
        removeHolidayTimeNext -
        removeNationalHolidaysTimeNext);
};
exports.returnShouldWorkTimeFuture = returnShouldWorkTimeFuture;
//# sourceMappingURL=function.js.map