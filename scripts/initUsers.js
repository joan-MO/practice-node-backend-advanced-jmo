'use strict';
const { Users } = require('../models');


module.exports = async function initUsers() {

    try {
        const { deletedCount } = await Users.deleteMany();
        console.log(`Deleted ${deletedCount} users.`);
       
        const users = await Usuario.insertMany([
            {
              email: "admin@example.com",
              password: Users.hashPassword('1234')
            }
        ]);
    
        console.log(`Inserted ${users.length} user${users.length > 1 ? 's' : ''}.`)
    } catch (error) {
        console.log(error);
    }
  }
  