import users from '../models/users.model';
import {User} from '../models/';

const usersRenderer = (req, res) => {
  if (req.method === 'GET'){
    console.log('users get');
    const {id} = req.params;
    User.all().then((users) => {
      res.set('Content-Type', 'text/plain');
      res.send(JSON.stringify(id ? users[id] : users, null, 2));
    }).catch(e => console.log(e));
  }
}

export default usersRenderer;
