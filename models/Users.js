'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String
});

usuarioSchema.statics.hashPassword = function(passwordDecrypted) {
  return bcrypt.hash(passwordDecrypted, 10);
}

usuarioSchema.methods.comparePassword = function(passwordDecrypted) {
  return bcrypt.compare( passwordDecrypted, this.password);
}

const Users = mongoose.model('Users', usuarioSchema);

module.exports = Users;
