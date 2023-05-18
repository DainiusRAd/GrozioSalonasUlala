var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Registracijos formos įrašymas (sukūrimas)
router.post('/users', async (req, res) => {
  try {
    const { name, email, registrationDate } = req.body;
    const user = new User({ name, email, registrationDate });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Užsiregistravusių vartotojų sąrašo gavimas
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Vartotojo atnaujinimas
router.patch('/users/:id', getUser, async (req, res) => {
  try {
    const { name, email, registrationDate } = req.body;
    if (name != null) {
      res.user.name = name;
    }
    if (email != null) {
      res.user.email = email;
    }
    if (registrationDate != null) {
      res.user.registrationDate = registrationDate;
    }
    await res.user.save();
    res.json(res.user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Vartotojo ištrynimas
router.delete('/users/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'Vartotojas ištrintas' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Funkcija tarpininkė, skirta gauti vartotoją pagal ID
async function getUser(req, res, next) {
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Vartotojas nerastas' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;
