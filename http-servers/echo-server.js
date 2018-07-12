const http = require('http');
// const url = require('url');
// var rs = require('replacestream');

const app = http.createServer((request, response) => {
  response.writeHead(200, {"Content-Type": "text/plain"});
  request.pipe(response);
});

app.listen(3000);
