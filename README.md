# cul-ave-rest-worktime

## 📝 Overview

このプログラムを実行すると、
経過した日付から土日と祝日を考慮して、次の締め日までに働く必要のある平均時間を求めます。

フルフレックスの人が所定労働時間をどのくらいで満たせるかどうかを計算するのを助ける pkg です。

## Usage

```
$ cal-ave-rest-worktime
? please type worktime #今日までに働いた時間を記述
```

これまで働いた時間を記述することで、今後働くべき時間、
1 日あたりの平均の働く時間を算出する。

### Attention

- 祝日と休日を考慮している。
- 有給は今後対応予定
- 締め日の入力も今後対応

## 🛰 Tech

- Typescript
- ESLint
- prettier
- webpack
