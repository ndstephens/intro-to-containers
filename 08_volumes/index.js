// Let's make a quick Node.js app that reads from a file that a number in it, prints it, writes it to a volume, and finishes.

// It looks for a file $DATA_PATH if it exists or ./data.txt if it doesn't and if it exists, it reads it, logs it, and writes back to the data file after incrementing the number. If it just run it right now, it'll create a data.txt file with 0 in it. If you run it again, it'll have 1 in there and so on.

const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(process.env.DATA_PATH || './data.txt');

fs.readFile(dataPath)
  .then((buffer) => {
    const data = buffer.toString();
    console.log(data);
    writeTo(+data + 1);
  })
  .catch((e) => {
    console.log("file not found, writing '0' to a new file");
    writeTo(0);
  });

const writeTo = (data) => {
  fs.writeFile(dataPath, data.toString()).catch(console.error);
};
