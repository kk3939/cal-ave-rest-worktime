"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const holiday_jp = __importStar(require("@holiday-jp/holiday_jp"));
const function_1 = require("./function");
const main = (workTime) => {
    const inputWorkTime = Number(workTime);
    const today = new Date();
    const perDayWorkTime = 8;
    // dayの番号で休日を表現（日曜と土曜）
    const holiday = [0, 6];
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
    console.log(preMonth, nextMonth);
    // 先月10日から昨日までの経過日数
    const workedTime = Math.floor((today.getTime() - preMonth.getTime()) / 86400000);
    console.log(`先月10日から昨日までで${workedTime}日経過しました。\n`);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~");
    // 土日の日数カウント
    const holidayNum = Math.floor(workedTime / 7) * holiday.length;
    // 半端な部分の中に土日が入っているか検証し、入っていたらremainedDayInHolidayNumを加算
    const remainedDayInHolidayNum = (0, function_1.checkContainedHoliday)(workedTime, preMonth, holiday);
    const removeHolidayTime = (holidayNum + remainedDayInHolidayNum) * perDayWorkTime;
    const nationalHolidaysArray = holiday_jp.between(preMonth, today);
    const removeNationalHolidaysTime = (0, function_1.returnRemoveNationalHolidayTime)(nationalHolidaysArray, perDayWorkTime);
    const shouldWorkTimeInPast = Math.floor(perDayWorkTime * workedTime) -
        removeHolidayTime -
        removeNationalHolidaysTime;
    console.log(`${shouldWorkTimeInPast}時間は働く必要がありました。`);
    const shouldWorkDate = Math.floor((nextMonth.getTime() - today.getTime()) / 86400000);
    const shoudWorkTime = shouldWorkDate * perDayWorkTime;
    const holidayNumfromTodayToNextMonth = (0, function_1.checkContainedHoliday)(shouldWorkDate, today, holiday);
    const shouldworkTimeForFuture = shoudWorkTime - holidayNumfromTodayToNextMonth * perDayWorkTime;
    console.log(`次の10日の締め日までに働かなければいけない時間数は、${shouldworkTimeForFuture}時間です。`);
    const sumShouldWorkTime = shouldWorkTimeInPast + shouldworkTimeForFuture;
    const restShouldWorkTime = sumShouldWorkTime - inputWorkTime;
    console.log(`\n入力された値から計算した結果、\n残り${shouldWorkDate - holidayNumfromTodayToNextMonth}日間で、${restShouldWorkTime}時間働かなければいけません。`);
    const restShouldWorkTimePerDay = restShouldWorkTime / (shouldWorkDate - holidayNumfromTodayToNextMonth);
    console.log(`すなわち、1日あたり平均${restShouldWorkTimePerDay}時間働かなければいけません。`);
};
exports.main = main;
//# sourceMappingURL=index.js.map