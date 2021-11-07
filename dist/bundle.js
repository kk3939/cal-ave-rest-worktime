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

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.returnRemoveNationalHolidayTime = exports.formatDate = void 0;\nconst formatDate = (dt) => {\n    const y = dt.getFullYear();\n    const m = `00${dt.getMonth() + 1}`.slice(-2);\n    const d = `00${dt.getDate()}`.slice(-2);\n    return `${y}-${m}-${d}`;\n};\nexports.formatDate = formatDate;\nconst returnRemoveNationalHolidayTime = (nationalHolidaysArray, perDayWorkTime) => {\n    if (nationalHolidaysArray === null) {\n        return 0;\n    }\n    if (nationalHolidaysArray.length > 0) {\n        const removeNationalHolidayTime = nationalHolidaysArray.length * perDayWorkTime;\n        console.log(`祝日は${nationalHolidaysArray.length}日ありました。`);\n        nationalHolidaysArray.forEach((element) => {\n            console.log(`- ${element[\"name\"]}`);\n        });\n        console.log(\"~~~~~~~~~~~~~~~~~~~~~~~~~\");\n        return removeNationalHolidayTime;\n    }\n    console.log(\"対象期間に祝日はありませんでした。\");\n    return 0;\n};\nexports.returnRemoveNationalHolidayTime = returnRemoveNationalHolidayTime;\n\n\n//# sourceURL=webpack://boilerplate-ts/./src/function.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst holiday_jp = __importStar(__webpack_require__(/*! @holiday-jp/holiday_jp */ \"@holiday-jp/holiday_jp\"));\nconst function_1 = __webpack_require__(/*! ./function */ \"./src/function.ts\");\nconst today = new Date();\nconst perDayWorkTime = 8;\n// dayの番号で休日を表現（日曜と土曜）\nconst holiday = [0, 6];\n// 一日ずれているから10日を表すために11日に設定\nconst preMonth = new Date(today.getFullYear(), today.getMonth() - 1, 11);\n// 10日を含めたいから12に設定\nconst nextMonth = new Date(today.getFullYear(), today.getMonth(), 12);\n// 先月10日から昨日までの経過日数\nconst workedTime = Math.floor((today.getTime() - preMonth.getTime()) / 86400000);\nconsole.log(`先月10日から昨日までで${workedTime}日経過しました。`);\nconsole.log(\"~~~~~~~~~~~~~~~~~~~~~~~~~\");\n// 土日の日数カウント\nconst holidayNum = Math.floor(workedTime / 7) * holiday.length;\n// 半端な部分の中に土日が入っているか検証し、入っていたらremainedDayInHolidayNumを加算\nconst remainedDay = Math.floor(workedTime % 7);\nlet remainedDayInHolidayNum = 0;\nif (remainedDay > 0) {\n    const beginDay = preMonth.getDay();\n    for (let i = 0; i < remainedDay; i++) {\n        if (holiday.indexOf((beginDay + i) % 7) != -1) {\n            remainedDayInHolidayNum++;\n        }\n    }\n}\nconst removeHolidayTime = (holidayNum + remainedDayInHolidayNum) * perDayWorkTime;\nconst nationalHolidaysArray = holiday_jp.between(preMonth, today);\nconst removeNationalHolidaysTime = (0, function_1.returnRemoveNationalHolidayTime)(nationalHolidaysArray, perDayWorkTime);\nconsole.log(`${Math.floor(perDayWorkTime * workedTime) -\n    removeHolidayTime -\n    removeNationalHolidaysTime}時間は働く必要がありました。`);\nconst shouldWorkTime = Math.floor((nextMonth.getTime() - today.getTime()) / 86400000);\nconsole.log(today);\nconsole.log(nextMonth);\nconsole.log(`次回の10日までに${shouldWorkTime}日、${shouldWorkTime * perDayWorkTime}時間は働く必要があります。`);\n\n\n//# sourceURL=webpack://boilerplate-ts/./src/index.ts?");

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