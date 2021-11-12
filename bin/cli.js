#!/usr/bin/env node

const { main } = require('../dist/index.js');
const inquirer = require("inquirer");
inquirer
  .prompt([{
    name: "worktime",
    message: "please type worktime",
    default: "0"
  }]).then((answers) => {
    main(answers.worktime);
  })
  .catch((error) => {
    console.log("Error");
    console.log(error);
  });