# cal-ave-rest-worktime

**this package is experimental!!**

## 📝 Overview

This program helpes you to calculate time to need to work by the deadline.

You, who adopt full flextime system that you can decide worktime depending on the day but you must meet total working hours in month, can use this package.

## 📎 Usage

Sorry, Questions are only Japanese.

```
$ cal-ave-rest-worktime
? 今日までに働いた時間を入力してください！
? 今日までに取得した有給を入力してください！時間ではなく日で入力してください。
? 今日から次の締め日までに取得する予定の有給を入力してください！時間ではなく日で入力してください。
```

Answer as following:

1. Hours you worked by today
2. Paidday you got from your company
3. Paidday you will get by next month deadline

All default value is zero.

Based on your answers, It shows you average time that you should.

### Functions in development

- recieve deadline date value.(you whoes deadline is except 10th will be able to use this pkg.)

## 🛰 Tech

- Typescript
- ESLint
- prettier
- @holiday-jp/holiday_jp
- inquirer
