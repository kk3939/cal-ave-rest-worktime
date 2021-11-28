# cal-ave-rest-worktime

**this package is experimental!!**

## 📝 Overview

このプログラムを実行すると、
経過した日付から土日と祝日を考慮して、次の締め日までに働く必要のある平均時間を求めます。

フルフレックスの人が所定労働時間をどのくらいで満たせるかどうかを計算するのを助ける pkg です。

## 📎 Usage

```
$ cal-ave-rest-worktime
? 今日までに働いた時間を入力してください！
? 今日までに取得した有給を入力してください！時間ではなく日で入力してください。
? 今日から次の締め日までに取得する予定の有給を入力してください！時間ではなく日で入力してください。
```

これまで働いた時間を記述することで、今後働くべき時間、
1 日あたりの平均の働く時間を算出する。

### Functions in development

- 締め日の入力も今後対応

## 🛰 Tech

- Typescript
- ESLint
- prettier
- @holiday-jp/holiday_jp
- inquirer
