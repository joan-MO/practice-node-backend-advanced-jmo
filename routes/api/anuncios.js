var express = require('express');
var router = express.Router();
const asyncHandler = require('express-async-handler')
const Anuncio = require('../../models/Anuncio');
const filtersFind = require('../../utils/utils');
const jwtAuthentificate = require('../../utils/jwtAuthentificate');
var path = require('path');

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
    
    //var img = fs.readFileSync(req.file.path);
    //var encode_image = img.toString('base64');
    // Define a JSONobject for the image attributes for saving to database
     

    const {name, sale, price} = req.body;

        
    const anuncio = new Anuncio({name,sale,price, photo: req.file.originalname})

    const anuncioCreate = await anuncio.save();

    res.status(201).json({ result: anuncio});

}));

module.exports = router;
