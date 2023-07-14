/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
// to parse json to pdf
// import html-pdf, this means I use json to html, and than parse the html to pdf.
let pdf = require("html-pdf");
const path = require("path");

// use openAI
 const { generateExamples } = require("./src/basicgenerators/openaiConf");

let fs = require("fs");
global.appRoot = path.resolve(__dirname);

const PLACEHOLDER = "{TBBODY}";



async function main() {
  let tbody = "";

  tbody += "<tbody>";

  let array = [
    {
      examples: ["He carefully ______ the onions into small pieces before adding them to the pot of soup."],
      word: "chop"
    },
    {word: "drown"},
    {word: "hot"},
  ];

// to foreach the array, and put the data into tbody. and use Promise to wait the data.

  await Promise.all(
    array.map(async (row) => {
      if (!row.examples) {
        let examples = await generateExamples(row.word);
        row.examples = examples;
      }
    })
  );

  array.forEach(function (row) {
    tbody += "<tr>";
    tbody += "<td>" + row.examples + "</td>";
    tbody += "<td>" + row.word + "</td>";
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
}

main();
