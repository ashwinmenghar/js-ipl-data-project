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
  const matchIds = new Set();

  for (let i = 0; i < matches.length; i++) {
    if (matches[i].season == season) {
      matchIds.add(matches[i].id);
    }
  }
  return matchIds;
};

export { writeFile, readFile, getMatchesId };
