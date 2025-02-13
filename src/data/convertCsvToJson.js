import csv from "csv-parser";
import fs from "fs";

const convertCsvToJson = (csvFilePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        console.log("Import Successfully");
        resolve(results);
      })
      .on("error", (error) => reject(error));
  });
};
let deliveries = [];
let matches = [];

const loadData = async () => {
  try {
    deliveries = await convertCsvToJson("src/data/deliveries.csv");
    matches = await convertCsvToJson("src/data/matches.csv");
  } catch (error) {
    console.error("Failed to load data:", error);
  }
};

await loadData();

export { deliveries, matches };
