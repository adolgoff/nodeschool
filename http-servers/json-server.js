const http = require('http');

const product = {
  id: 1,
  name: 'Supreme T-Shirt',
  brand: 'Supreme',
  price: 99.99,
  options: [
      { color: 'blue' },
      { size: 'XL' }
  ]
};

const app = http.createServer((request, response) => {
  response.writeHead(200, {"Content-Type": "text/json"});
  response.write(JSON.stringify(product, null, 2));
  response.end();
});

app.listen(3000);
