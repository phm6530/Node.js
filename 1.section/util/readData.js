const fs = require('node:fs/promises');
const path = require('path'); // path

// boardPath
const boardPath = path.join(__dirname, '..' , 'jsonData' , 'Board.json');

async function readData() {
  const filePath = path.join(__dirname, '..' , 'jsonData' , 'users.json');

  const data = await fs.readFile( filePath , 'utf8');
  return JSON.parse(data);
}

async function BoardData() {
  const data = await fs.readFile( boardPath , 'utf8');
  return JSON.parse(data);
}

async function BoardWirte(data) {
  await fs.writeFile( boardPath , JSON.stringify(data));
  // return JSON.parse(data);
}

async function ProjectData() {
  const filePath = path.join(__dirname, '..' , 'jsonData' , 'project.json');
  const data = await fs.readFile( filePath , 'utf8');
  return JSON.parse(data);
}



exports.readData = readData;
exports.BoardData = BoardData;
exports.BoardWirte = BoardWirte;
exports.ProjectData = ProjectData;
