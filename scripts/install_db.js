'use strict';
require('dotenv').config();
const db = require('../lib/connectMongoose');
//const Anuncio = require('../models/Anuncio');
const initAnnoucement = require('./initAnnoucement');
const initUsers = require('./initUsers');

initDB().catch(err => console.error(err));

async function initDB(){
    try {
        await initAnnoucement();
        await initUsers();
        db.close();
       
    } catch (error) {
        console.log(error);
    }
}

