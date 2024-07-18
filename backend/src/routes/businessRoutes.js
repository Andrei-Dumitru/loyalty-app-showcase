const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Business = mongoose.model('Business');

const router = express.Router();

router.use(requireAuth);

router.get('/businesses', async (req, res) => {
    const businesses = await Business.find();

    res.send(businesses);
});

router.post('/businesses', async (req, res) => {
    const { name, description, offers, imageUri, locationUri } = req.body;

    if(!name || !description || !imageUri || !locationUri || !offers ) {
        return res.status(422).send({ error: 'You must provide all the specifications'});
    }

    try{
        const business = new Business({ name, description, imageUri, locationUri, offers });
        await business.save();
        res.send(business);
    } catch(err) {
        res.status(422).send({ error: err.message });
    }
    
});

module.exports = router;