'use strict';
const { Anuncio } = require('../models');
const dataAnuncio = require('./anuncios.json')

module.exports = async function initAnnoucement() {
    try {
        await Anuncio.deleteMany();
        await Anuncio.insertMany(dataAnuncio.announcements);
    } catch (error) {
        console.log(error);
    }
}