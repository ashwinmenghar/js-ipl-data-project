import csv from "csv-parser";
import fs from "fs";

function convertCsvToJson(csvFilePath, newFile) {
  const results = [];
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      fs.writeFileSync(newFile, JSON.stringify(results, null, 2));
      console.log("Import Successfully");
    });
}

convertCsvToJson("deliveries.csv", "./deliveries.json");
convertCsvToJson("matches.csv", "./matches.json");
