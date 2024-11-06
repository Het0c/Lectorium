const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); 

const app = express();
app.use(bodyParser.json());
app.use(cors());

const sequelize = new Sequelize('lectorium', 'root', 'Canela17_', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Error: ' + err));

const User = sequelize.define('user', {
  email: { type: Sequelize.STRING, unique: true },
  password: { type: Sequelize.STRING },
  resetCode: { type: Sequelize.STRING } // Añade este campo
}, {
  timestamps: false
});

sequelize.sync()
  .then(() => console.log('Users table created'));

// Configurar el transportador de nodemailer
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
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(400).json({ error: 'Invalid credentials' });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
});
app.post('/register', (req, res) => {
  const { email, password } = req.body;
  User.create({ email, password })
    .then(user => res.json(user)) // Debería retornar el usuario creado
    .catch(err => res.status(500).json({ error: err }));
});
// RX8REVJM3GUAPWYGU1NMHWUX
app.post('/reset-password', (req, res) => {
  const { email } = req.body;
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  User.update({ resetCode }, { where: { email } })
    .then(result => {
      if (result[0] === 0) {
        res.status(404).json({ error: 'Usuario no encontrado' });
      } else {
        const mailOptions = {
          from: 'RecuperacionLectorium@gmail.com',
          to: email,
          subject: 'Código de Verificación para Restablecer Contraseña',
          text: `Tu código de verificación es: ${resetCode}`
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error al enviar el correo:', error); // Log del error
            res.status(500).json({ error: 'Error al enviar el correo' });
          } else {
            console.log('Correo enviado:', info.response); // Log del éxito
            res.json({ message: 'Correo de restablecimiento enviado' });
          }
        });
      }
    })
    .catch(err => {
      console.error('Error en reset-password:', err); // Log del error
      res.status(500).json({ error: err });
    });
});
app.post('/verify-code', (req, res) => {
  const { email, code } = req.body;
  User.findOne({ where: { email, resetCode: code } })
    .then(user => {
      if (user) {
        res.json({ message: 'Código verificado' });
      } else {
        res.status(400).json({ error: 'Código inválido' });
      }
    })
    .catch(err => res.status(500).json({ error: err }));
});

app.post('/update-password', (req, res) => {
  const { email, newPassword } = req.body;
  User.update({ password: newPassword, resetCode: null }, { where: { email } }) // Restablece resetCode a null
    .then(() => res.json({ message: 'Contraseña actualizada' }))
    .catch(err => res.status(500).json({ error: err }));
});

app.listen(3001, () => console.log('Server running on port 3001'));
