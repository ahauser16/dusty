const express = require('express');
const router = express.Router();

// Load Dog model
const Dog = require('../models/Dogs');

// @route GET api/dogs/test
// @description tests dogs route
// @access Public
router.get('/test', (req, res) => res.send('dog route testing!'));

// @route GET api/dogs
// @description Get all dogs
// @access Public
router.get('/', (req, res) => {
  Dog.find()
    .then(dogs => res.json(dogs))
    .catch(err => res.status(404).json({ nodogsfound: 'No Dogs found' }));
});

// @route GET api/dogs/:id
// @description Get single dog by id
// @access Public
router.get('/:id', (req, res) => {
  Dog.findById(req.params.id)
    .then(dog => res.json(dog))
    .catch(err => res.status(404).json({ nodogfound: 'No Dog found' }));
});

// @route GET api/dogs
// @description add/save dog
// @access Public
router.post('/', (req, res) => {
  Dog.create(req.body)
    .then(dog => res.json({ msg: 'Dog added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this dog' }));
});

// @route GET api/dogs/:id
// @description Update dog
// @access Public
router.put('/:id', (req, res) => {
  Dog.findByIdAndUpdate(req.params.id, req.body)
    .then(dog => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/dogs/:id
// @description Delete dog by id
// @access Public
router.delete('/:id', (req, res) => {
  Dog.findByIdAndRemove(req.params.id, req.body)
    .then(dog => res.json({ mgs: 'Dog entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a dog' }));
});

module.exports = router;