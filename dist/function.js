"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkContainedHoliday = exports.returnRemoveNationalHolidayTime = exports.formatDate = void 0;
const formatDate = (dt) => {
    const y = dt.getFullYear();
    const m = `00${dt.getMonth() + 1}`.slice(-2);
    const d = `00${dt.getDate()}`.slice(-2);
    return `${y}-${m}-${d}`;
};
exports.formatDate = formatDate;
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
const checkContainedHoliday = (workedTime, month, holiday) => {
    const remainedDay = Math.floor(workedTime % 7);
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
//# sourceMappingURL=function.js.map