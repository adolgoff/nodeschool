const http = require('http');
const fs = require('fs');
const url = require('url');
var rs = require('replacestream');

const app = http.createServer((request, response) => {
  const query = url.parse(request.url, true).query;
  const message = query.message || 'Message';
  response.writeHead(200, {"Content-Type": "text/html"});
  const src = fs.createReadStream('./index.html');
  src.pipe(rs('{message}', message)).pipe(response);
});

app.listen(3000);
