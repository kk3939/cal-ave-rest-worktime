import { returnPreNextMonth } from "../function";
import { preNextMonth } from "../type";

describe("function.ts", () => {
  test("全ての月で範囲が正しいかチェック", () => {
    for (let i = 0; i < 12; i++) {
      const firstToTenTestDate: Date = new Date(2021, i, 1);
      const firstToTenDateObject: preNextMonth =
        returnPreNextMonth(firstToTenTestDate);
      expect(firstToTenDateObject).toEqual({
        preMonth: new Date(2021, i - 1, 11),
        nextMonth: new Date(2021, i, 12),
      });
      const tenToLastTestDate: Date = new Date(2021, i, 15);
      const tenToLastDateObject: preNextMonth =
        returnPreNextMonth(tenToLastTestDate);
      expect(tenToLastDateObject).toEqual({
        preMonth: new Date(2021, i, 11),
        nextMonth: new Date(2021, i + 1, 12),
      });
    }
  });
});
