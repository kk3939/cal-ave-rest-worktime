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
const main = (workTime, prePaidtime, fromNowAndOnPaidtime) => {
    const inputFromNowAndOnPaidtime = Number(fromNowAndOnPaidtime);
    const inputPrePaidtime = Number(prePaidtime);
    const inputWorkTime = Number(workTime);
    const today = new Date();
    const perDayWorkTime = 8;
    // dayの番号で休日を表現（日曜と土曜）
    const holiday = [0, 6];
    const preMonth = (0, function_1.returnPreNextMonth)(today).preMonth;
    const nextMonth = (0, function_1.returnPreNextMonth)(today).nextMonth;
    // 先月10日から昨日までの経過日数
    const workedTime = Math.floor((today.getTime() - preMonth.getTime()) / 86400000);
    console.log(`先月10日から昨日までで${workedTime}日経過しました。\n`);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~");
    // 土日の日数カウント
    const holidayNum = (0, function_1.returnHolidayNum)(workedTime, holiday);
    // 半端な部分の中に土日が入っているか検証し、入っていたらremainedDayInHolidayNumを加算
    const remainedDayInHolidayNum = (0, function_1.checkContainedHoliday)(workedTime, preMonth, holiday);
    // 減算すべき休日分の時間の合計
    const removeHolidayTime = (holidayNum + remainedDayInHolidayNum + inputPrePaidtime) * perDayWorkTime;
    // 前月から今日までの祝日を取得
    const nationalHolidaysArray = holiday_jp.between(preMonth, today);
    // 祝日分の減算すべき値を取得して、コンソールに祝日一覧を出力
    const removeNationalHolidaysTime = (0, function_1.returnRemoveNationalHolidayTime)(nationalHolidaysArray, perDayWorkTime);
    // 今日までに働くべき合計の値を算出
    const shouldWorkTimeInPast = (0, function_1.returnShouldWorkTimeInPast)(perDayWorkTime, workedTime, removeHolidayTime, removeNationalHolidaysTime);
    console.log(`${shouldWorkTimeInPast}時間は働く必要がありました。`);
    // 来月までの締め日までの日数を出力
    const shouldWorkDate = (0, function_1.returnShouldWorkDate)(today, nextMonth);
    // 働く時間（減算すべき値はまだ引いていない）
    const shouldWorkTime = shouldWorkDate * perDayWorkTime;
    // 休日を計算し、今後働かなければいけない時間を算出
    const holidayNumfromTodayToNextMonth = (0, function_1.returnHolidayNum)(shouldWorkDate, holiday);
    const remainedHolidayNumfromTodayToNextMonth = (0, function_1.checkContainedHoliday)(shouldWorkDate, today, holiday);
    const shouldworkTimeForFuture = shouldWorkTime -
        (holidayNumfromTodayToNextMonth + remainedHolidayNumfromTodayToNextMonth) *
            perDayWorkTime;
    console.log(`次の10日の締め日までに働かなければいけない時間数は、${shouldworkTimeForFuture}時間です。`);
    const sumShouldWorkTime = shouldWorkTimeInPast +
        shouldworkTimeForFuture -
        inputFromNowAndOnPaidtime * perDayWorkTime;
    // これまで働いた時間を加味した今後働くべき時間
    const restShouldWorkTime = sumShouldWorkTime - inputWorkTime;
    console.log(`\n入力された値から計算した結果、\n残り${shouldWorkDate -
        holidayNumfromTodayToNextMonth -
        inputFromNowAndOnPaidtime}日間で、${restShouldWorkTime}時間働かなければいけません。`);
    // 残りの期間、1日あたり働かなければいけない平均の時間
    const restShouldWorkTimePerDay = restShouldWorkTime /
        (shouldWorkDate -
            holidayNumfromTodayToNextMonth -
            inputFromNowAndOnPaidtime);
    console.log(`すなわち、1日あたり平均${restShouldWorkTimePerDay}時間働かなければいけません。`);
};
exports.main = main;
//# sourceMappingURL=index.js.map