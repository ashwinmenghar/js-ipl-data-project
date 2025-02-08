import fs from "fs";

const writeFile = (data, fileName) => {
  fs.writeFile(
    "../public/output/" + fileName,
    JSON.stringify(data, null, 2),
    { encoding: "utf8" },
    (err) => {
      if (err) console.log(err.message);
      else console.log("File written successfully\n");
    }
  );
};

const readFile = (filePath, cb) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, JSON.parse(data));
    }
  });
};

export { writeFile, readFile };
