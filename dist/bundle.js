/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/function.ts":
/*!*************************!*\
  !*** ./src/function.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.checkContainedHoliday = exports.returnRemoveNationalHolidayTime = exports.formatDate = void 0;\nconst formatDate = (dt) => {\n    const y = dt.getFullYear();\n    const m = `00${dt.getMonth() + 1}`.slice(-2);\n    const d = `00${dt.getDate()}`.slice(-2);\n    return `${y}-${m}-${d}`;\n};\nexports.formatDate = formatDate;\nconst returnRemoveNationalHolidayTime = (nationalHolidaysArray, perDayWorkTime) => {\n    if (nationalHolidaysArray === null) {\n        return 0;\n    }\n    if (nationalHolidaysArray.length > 0) {\n        const removeNationalHolidayTime = nationalHolidaysArray.length * perDayWorkTime;\n        console.log(`祝日は${nationalHolidaysArray.length}日ありました。`);\n        nationalHolidaysArray.forEach((element) => {\n            console.log(`- ${element[\"name\"]}`);\n        });\n        console.log(\"~~~~~~~~~~~~~~~~~~~~~~~~~\\n\");\n        return removeNationalHolidayTime;\n    }\n    console.log(\"対象期間に祝日はありませんでした。\");\n    return 0;\n};\nexports.returnRemoveNationalHolidayTime = returnRemoveNationalHolidayTime;\nconst checkContainedHoliday = (workedTime, month, holiday) => {\n    const remainedDay = Math.floor(workedTime % 7);\n    let remainedDayInHolidayNum = 0;\n    if (remainedDay > 0) {\n        const beginDay = month.getDay();\n        for (let i = 0; i < remainedDay; i++) {\n            if (holiday.indexOf((beginDay + i) % 7) != -1) {\n                remainedDayInHolidayNum++;\n            }\n        }\n    }\n    return remainedDayInHolidayNum;\n};\nexports.checkContainedHoliday = checkContainedHoliday;\n\n\n//# sourceURL=webpack://boilerplate-ts/./src/function.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst holiday_jp = __importStar(__webpack_require__(/*! @holiday-jp/holiday_jp */ \"@holiday-jp/holiday_jp\"));\nconst function_1 = __webpack_require__(/*! ./function */ \"./src/function.ts\");\nconst today = new Date();\nconst perDayWorkTime = 8;\n// dayの番号で休日を表現（日曜と土曜）\nconst holiday = [0, 6];\nlet preDigit;\nlet nextDigit;\nif (today.getDate() < 10) {\n    preDigit = 0;\n    nextDigit = 1;\n}\nelse {\n    preDigit = 0;\n    nextDigit = 1;\n}\n// 一日ずれているから10日を表すために11日に設定\nconst preMonth = new Date(today.getFullYear(), today.getMonth() + preDigit, 11);\n// 10日を含めたいから12に設定\nconst nextMonth = new Date(today.getFullYear(), today.getMonth() + nextDigit, 12);\nconsole.log(preMonth, nextMonth);\n// 先月10日から昨日までの経過日数\nconst workedTime = Math.floor((today.getTime() - preMonth.getTime()) / 86400000);\nconsole.log(`先月10日から昨日までで${workedTime}日経過しました。\\n`);\nconsole.log(\"~~~~~~~~~~~~~~~~~~~~~~~~~\");\n// 土日の日数カウント\nconst holidayNum = Math.floor(workedTime / 7) * holiday.length;\n// 半端な部分の中に土日が入っているか検証し、入っていたらremainedDayInHolidayNumを加算\nconst remainedDayInHolidayNum = (0, function_1.checkContainedHoliday)(workedTime, preMonth, holiday);\nconst removeHolidayTime = (holidayNum + remainedDayInHolidayNum) * perDayWorkTime;\nconst nationalHolidaysArray = holiday_jp.between(preMonth, today);\nconst removeNationalHolidaysTime = (0, function_1.returnRemoveNationalHolidayTime)(nationalHolidaysArray, perDayWorkTime);\nconst shouldWorkTimeInPast = Math.floor(perDayWorkTime * workedTime) -\n    removeHolidayTime -\n    removeNationalHolidaysTime;\nconsole.log(`${shouldWorkTimeInPast}時間は働く必要がありました。`);\nconst shouldWorkDate = Math.floor((nextMonth.getTime() - today.getTime()) / 86400000);\nconst shoudWorkTime = shouldWorkDate * perDayWorkTime;\nconst holidayNumfromTodayToNextMonth = (0, function_1.checkContainedHoliday)(shouldWorkDate, today, holiday);\nconst shouldworkTimeForFuture = shoudWorkTime - holidayNumfromTodayToNextMonth * perDayWorkTime;\nconsole.log(`次の10日の締め日までに働かなければいけない時間数は、${shouldworkTimeForFuture}時間です。`);\nconst sumShouldWorkTime = shouldWorkTimeInPast + shouldworkTimeForFuture;\n// TODO:CLIツールにするためにこの部分を入力受け付けるようにする。\nconst inputWorkTime = 160;\nconst restShouldWorkTime = sumShouldWorkTime - inputWorkTime;\nconsole.log(`\\n入力された値から計算した結果、\\n残り${shouldWorkDate - holidayNumfromTodayToNextMonth}日間で、${restShouldWorkTime}時間働かなければいけません。`);\nconst restShouldWorkTimePerDay = restShouldWorkTime / (shouldWorkDate - holidayNumfromTodayToNextMonth);\nconsole.log(`すなわち、1日あたり平均${restShouldWorkTimePerDay}時間働かなければいけません。`);\n\n\n//# sourceURL=webpack://boilerplate-ts/./src/index.ts?");

/***/ }),

/***/ "@holiday-jp/holiday_jp":
/*!*****************************************!*\
  !*** external "@holiday-jp/holiday_jp" ***!
  \*****************************************/
/***/ ((module) => {

module.exports = require("@holiday-jp/holiday_jp");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;