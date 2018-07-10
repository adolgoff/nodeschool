import users from '../models/users.model';

const usersRenderer = (req, res) => {
  if (req.method === 'GET'){
    const {id} = req.params;
    res.set('Content-Type', 'text/plain');
    res.send(JSON.stringify((id ? users[id] : users), null, 2));
  }
}

export default usersRenderer;
