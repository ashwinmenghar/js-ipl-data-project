import fs from "fs";

const writeFile = (data, fileName) => {
  console.log(fileName);

  try {
    fs.writeFileSync(
      "./src/public/output/" + fileName,
      JSON.stringify(data, null, 2),
      { encoding: "utf8" }
    );
    console.log("File written successfully\n");
  } catch (error) {
    console.log(error.message);
  }
};

const readFile = (filePath, cb) => {
  try {
    const result = fs.readFileSync(filePath, "utf8");
    return JSON.parse(result);
  } catch (error) {
    console.log(err);
  }
};

const getMatchesId = (matches, season) => {
  return new Set(
    matches.filter((match) => match.season == season).map((match) => match.id)
  );
};

export { writeFile, readFile, getMatchesId };
