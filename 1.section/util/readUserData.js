const fs = require('node:fs/promises');
const path = require('path'); // path

async function readData() {
  const filePath = path.join(__dirname, '..' , 'user_json' , 'users.json');

  const data = await fs.readFile( filePath , 'utf8');
  return JSON.parse(data);
}

exports.readData = readData;
