# cal-ave-rest-worktime

**This package is in experiment!!**

## 📝 Overview

This program helps to calculate time needed to work until the next work deadline.

This package is for anyone who adopts full flextime system, where the work time per day can be decided flexibly, but must meet the total monthly working hours.

## 📎 Usage

Sorry, questions are only in Japanese.

```
$ cal-ave-rest-worktime
? 今日までに働いた時間を入力してください！
? 今日までに取得した有給を入力してください！時間ではなく日で入力してください。
? 今日から次の締め日までに取得する予定の有給を入力してください！時間ではなく日で入力してください。
```

Answer as following:

1. Hours of work until today
2. Number of paid holidays given from the company
3. Number of paid holidays you will get by the next work deadline

All default value is zero.

Based on the answers, it calculates the average time to work.

### Functions in development

- receive deadline date value. (for now, work deadline is set to the 10th of each month.)

## 🛰 Tech

- Typescript
- ESLint
- prettier
- @holiday-jp/holiday_jp
- inquirer
