//import jwt
const jwt = require('jsonwebtoken');

async function authenticator(req,res,next) {
    try {
        
        const token = req.query.token ? req.query.token : req.headers.authorization;
 
        if(token && process.env.API_KEY){
            jwt.verify(token, process.env.API_KEY, (err, encoded) => { 
                if(err){
                    res.status(401).json({error:err});
                } else {
                    next() 
                }
            });
        } else {
            res.status(401).json({error: 'Accès refusé'});
        }
    } catch (error) {
        res.status(500).send(error);
    }

};
module.exports = authenticator;
