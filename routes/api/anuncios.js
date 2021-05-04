var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler')
const Anuncio = require('../../models/Anuncio');
const filtersFind = require('../../utils/utils');
const jwtAuthentificate = require('../../utils/jwtAuthentificate');
var path = require('path');
const cote = require('cote');
const requester = new cote.Requester({ name: 'client of thumbnail'});

var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/anuncios')
    },
    filename: function (req, file, cb) {
      cb(null,Date.now() + path.extname(file.originalname))
    }
  })
   
var upload = multer({ storage: storage })

//GET /apiv1/anuncios

router.get('/',jwtAuthentificate, asyncHandler(async (req, res, next) => {

    try {     
        const name = req.query.name;
        const sale = req.query.sale;
        const price = req.query.price;
        const tags = req.query.tags;
        const limit = parseInt(req.query.limit) || null;
        const start = parseInt(req.query.start) || null;
        const fields = req.query.fields || null;
        const sort = req.query.sort || null;
        const filters = {};
        
        filtersFind(filters,tags,name,sale,price)
    
        const resultado = await Anuncio.list(filters, limit, start, fields, sort);
        res.json(resultado);
        
    } catch (error) {
        next(error);
    }

}));

// GET /apiv1/anuncios/tags

router.get('/tags', asyncHandler(async (req, res, next) => {
    
    const list_tags = {tags:[]};

    const all_tags = await Anuncio.distinct("tags");

    all_tags.forEach(tag => {
        list_tags.tags.push(tag);
    });
    
    res.json(list_tags)

}));

// POST /apiv1/anuncios {body}

router.post('/',upload.single('photo'), asyncHandler(async (req, res, next) => {

    const {tags, name, sale, price} = req.body;

    const file = req.file;
        
    requester.send({
        type: 'thumbnail',
        file: file,
    });

    const anuncio = new Anuncio({tags, name, sale, price, photo: req.file.filename})

    await anuncio.save();

    res.status(201).json({ result: anuncio});

res.send('test')
    

}));

module.exports = router;
