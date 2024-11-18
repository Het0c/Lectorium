const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); 

const app = express();
app.use(bodyParser.json());
app.use(cors());

const sequelize = new Sequelize('lectorium', 'root', 'jDXgT61EhWinGAx0Wy2H', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Error: ' + err));

const User = sequelize.define('user', {
  email: { type: Sequelize.STRING, unique: true },
  password: { type: Sequelize.STRING },
  resetCode: { type: Sequelize.STRING }
}, {
  timestamps: false
});

sequelize.sync()
  .then(() => console.log('Users table created'));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'recuperacionLectorium@gmail.com',
    pass: 'imxm mmng msdr qdxi'
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email, password } })
    .then(email => {
      if (email) {
        res.json(email);
      } else {
        res.status(400).json({ error: ' Credenciales incorrectas.' });
      }
    })
    .catch(err => {
      console.error('Error in /login:', err);
      res.status(500).json({ error: ' Tiempo de espera agotado. Intente más tarde.' });
    });
});

app.post('/register', (req, res) => {
  const { email, password } = req.body;
  User.create({ email, password })
    .then(user => res.json(user))
    .catch(err => {
      console.error('Error in /register:', err);
      res.status(500).json({ error: 'Tiempo de espera agotado. Intente más tarde.' });
    });
});

app.post('/reset-password', (req, res) => {
  const { email } = req.body;
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  User.update({ resetCode }, { where: { email } })
    .then(result => {
      if (result[0] === 0) {
        res.status(404).json({ error: 'User not found' });
      } else {
        const mailOptions = {
          from: 'RecuperacionLectorium@gmail.com',
          to: email,
          subject: 'Codigo de verificacion reinicio de contraseña',
          text: `Tu codigo de verificacion es: ${resetCode}`
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error enviando Email:', error);
            res.status(500).json({ error: 'Error enviando Email:' });
          } else {
            console.log('Email sent:', info.response);
            res.json({ message: 'email de cambio de contraseña enviado' });
          }
        });
      }    
    })
    .catch(err => {
      console.error('Error in /reset-password:', err);
      res.status(500).json({ error: 'Tiempo de espera agotado. Intente más tarde.' });
    });
});

app.post('/verify-code', (req, res) => {
  const { email, code } = req.body;
  User.findOne({ where: { email, resetCode: code } })
    .then(user => {
      if (user) {
        res.json({ message: 'Codigo verificado' });
      } else {
        res.status(400).json({ error: 'Invalid code' });
      }
    })
    .catch(err => {
      console.error('Error in /verify-code:', err);
      res.status(500).json({ error: 'Tiempo de espera agotado. Intente más tarde.' });
    });
});

app.post('/update-password', (req, res) => {
  const { email, newPassword } = req.body;
  User.update({ password: newPassword, resetCode: null }, { where: { email } })
    .then(() => res.json({ message: 'Password updated' }))
    .catch(err => {
      console.error('Error in /update-password:', err);
      res.status(500).json({ error: 'Tiempo de espera agotado. Intente más tarde.' });
    });
});

app.listen(3001, () => console.log('Server running on port 3001'));

