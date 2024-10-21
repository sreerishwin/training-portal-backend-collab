const jwt = require('jsonwebtoken');

const authMiddleware = () => {
    return (req, res, next) => {

        const authHeader = req.headers['authorization']
        let token;
        if (authHeader && authHeader.startsWith('Bearer '))
        {
            token = authHeader.split(' ')[1];
        } else {
            token = req.cookies.token;
        } 

        if (!token) return res.sendStatus(401);
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.sendStatus(403); 
            req.user = user; 
            next();
        });
    };
};
 
module.exports = authMiddleware;