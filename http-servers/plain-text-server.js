const http = require('http');

const app = http.createServer((request, response) => {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write('Hello world');
  response.end();
});

app.listen(3000);
