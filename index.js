const inquirer = require("inquirer");
const connection = require("./mysql-connection/connection");
const cTable = require("console.table");
const logo = require("asciiart-logo");
const config = require("./package.json");

