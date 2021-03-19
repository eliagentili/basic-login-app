const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const router = express.Router();
const fetch = require('node-fetch');

const permittedRoles = ['root'];

// router.post('/users', async (req, res) => {
router.post('/users', [auth, permit(permittedRoles)], async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    // sendWelcomeEmail(user.email, user.insegna);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );

    if (!user.active) {
      res.status(401).send(`Non sei autorizzato ad utilizzare l'applicazione.`);
    }

    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: 'Credenziali non corrette.',
    });
  }
});

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.get('/users', [auth, permit(permittedRoles)], async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
