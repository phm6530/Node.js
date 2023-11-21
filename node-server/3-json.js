const http = require('http');
const fs = require('fs');

const courses = [
  {name: 'HTML1'},
  {name: 'HTML2'},
  {name: 'HTML3'},
  {name: 'HTML4'}
]

const server = http.createServer((req, res) => {
  const url = req.url; // JSON 받기
  const method = req.method;
  if(url === '/cols'){
    if(method === 'GET'){
        res.writeHead(200, {'Content-Type' : 'application/json'});
        res.end(JSON.stringify(courses));
    }
  }
});

server.listen(8080);
