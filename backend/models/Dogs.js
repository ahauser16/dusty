const mongoose = require('mongoose');

const DogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  breedTypePrim: {
    type: String,
    required: true
  },
  breedTypeSec: {
    type: String,
    required: false
  },
  birthday: {
    type: Date,
    required: false
  },
  adoptionDate: {
    type: Date,
    required: true
  },
  weight: {
    type: Number,
    required: false
  },
  origin: {
    type: String,
    required: false
  }
});

module.exports = Dog = mongoose.model('dog', DogSchema);