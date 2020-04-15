import jwt from 'jsonwebtoken';

function genAuthToken(userData) {
    try {
        return jwt.sign(userData, process.env.JWT_SECRET);
    } catch (e) {
        console.log(e);
        return null
    }
}

function verifyAuthToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        console.log(e.stack);
        return null;
    }
}

function requireAuth(req, res, next) {
    if (!req.decoded_token) {
        res.status(403).end();
    } else {
        next();
    }
}

function getAuthToken(req, _, next) {
    if (req.headers.authorization) {
        const token_string = 
            req.headers.authorization.split(' ')[1];

        if (token_string) {
            req.decoded_token = verifyAuthToken(token_string);
        }
    }

    next();
}

export {
    genAuthToken,
    requireAuth,
    getAuthToken
};
