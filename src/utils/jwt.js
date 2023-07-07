import jwt from 'jsonwebtoken';

const PRIVATE_KET = 'claveprivadasecreta';

export const generateToken = user => {
    const token = jwt.sign({user}, PRIVATE_KET, {expiresIn: '24h'});
    return token;
};

export const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization ? req.headers.authorization: req.headers.Authorization   ;
    if(!authHeader) return res.status(401).send({ error: 'Not authenticated'})
    const token = authHeader.split(' ')[1];
    jwt.verify(token, PRIVATE_KET, (error, credentials) => {
        if(error) return res.status(403).send({ error: 'Not authorized'})
        req.user = credentials.user;
        next()
    })
}

