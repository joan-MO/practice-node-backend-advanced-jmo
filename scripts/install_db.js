'use strict'
const db = require('../lib/connectMongoose');
const Anuncio = require('../models/Anuncio');
const dataAnuncio = require('./anuncios.json')

initDB().catch(err => console.error(err));

async function initDB(){
    try {
        
        await Anuncio.deleteMany();
        await Anuncio.insertMany(dataAnuncio.announcements)
        db.close();
       
    } catch (error) {
        console.log(error);
    }
}



