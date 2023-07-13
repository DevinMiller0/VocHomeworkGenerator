/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
// to parse json to pdf
// import html-pdf, this means I use json to html, and than parse the html to pdf.
let pdf = require("html-pdf");
const path = require("path");

let fs = require("fs");
global.appRoot = path.resolve(__dirname);

const PLACEHOLDER = "{TBBODY}";

let tbody = "";

tbody += "<tbody>";

let array = [
  { key_one: "He carefully ______ the onions into small pieces before adding them to the pot of soup.", key_two: "chop" },
  { key_one: "123", key_two: "test" },
];
array.forEach(function (row) {
  tbody += "<tr>";
  tbody += "<td>" + row.key_one + "</td>";
  tbody += "<td>" + row.key_two + "</td>";
  tbody += "</tr>";
});
tbody += "</tbody>";

let options = {
  format: "A4",
  orientation: "portrait",
  timeout: "12000",
  base: "",
};

let htmlTemplate = fs.readFileSync("./base/Template.html", "utf8");

// put tbody into html template.
htmlTemplate = htmlTemplate.replace(PLACEHOLDER, tbody);

// to create pdf
pdf.create(htmlTemplate, options).toFile("./test.pdf", function (err, result) {
  if (err) return console.log(err);
  console.log("pdf create ");
});
