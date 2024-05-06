const express = require('express');
const router = express.Router();


const validation = require('../middlewares/validation.js');


// captcha-svg
const svgCaptcha = require('svg-captcha');

// GET captcha
router.get('/', (req, res) => {
    const captcha = svgCaptcha.create();
    res.json({ text: captcha.text, svg: captcha.data });
});



module.exports = router;