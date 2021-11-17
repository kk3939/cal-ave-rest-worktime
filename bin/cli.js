#!/usr/bin/env node

const { main } = require('../dist/index.js');
const inquirer = require("inquirer");
inquirer
  .prompt([{
    name: "worktime",
    message: "今日までに働いた時間を入力してください！",
    default: "0"
  },
  {
    name: "prePaidtime",
    message: "今日までに取得した有給を入力してください！時間ではなく日で入力してください。",
    default: "0"
  },
  {
    name: "fromNowAndOnPaidtime",
    message: "今日から次の締め日までに取得する予定の有給を入力してください！時間ではなく日で入力してください。",
    default: "0"
  }
  ]).then((answers) => {
    main(answers.worktime, answers.prePaidtime, answers.fromNowAndOnPaidtime);
  })
  .catch((error) => {
    console.log("Error");
    console.log(error);
  });