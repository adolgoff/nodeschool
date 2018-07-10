import products from '../models/products.model';

const productsRenderer = (req, res) => {
  if (req.method === 'GET'){
    const {id} = req.params;
    res.set('Content-Type', 'text/plain');
    res.send(JSON.stringify((id ? products[id] : products), null, 2));
  } else if (req.method === 'POST') {
    // TODO: validate and save req.query as a model
    res.send(req.query);
  }
}

const reviewsRenderer = (req, res) => {
  if (req.method === 'GET'){
    const {id} = req.params;
    res.set('Content-Type', 'text/plain');
    res.send(id ? products[id].reviews.join('\n') : 'No product found');
  }
}

export {productsRenderer, reviewsRenderer};
