const express = require('express');
const Sequelize = require('sequelize');

const app = express();
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Error: ' + err));

const User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});

sequelize.sync()
  .then(() => console.log('Users table created'));

app.listen(3000, () => console.log('Server running on port 3000'));

app.post('/register', (req, res) => {
    const { email, password } = req.body;
  
    User.create({ email, password })
      .then(user => res.json(user))
      .catch(err => res.status(500).json({ error: err }));
  });
  
  app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    User.findOne({ where: { email, password } })
      .then(user => {
        if (user) {
          res.json(user);
        } else {
          res.status(400).json({ error: 'Invalid credentials' });
        }
      })
      .catch(err => res.status(500).json({ error: err }));
  });
  