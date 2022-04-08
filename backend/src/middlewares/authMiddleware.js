const jwt = require('jsonwebtoken');

const timeUtils = require('../utils/timeUtils')();

function authMiddleware() {

    function middleware(req, res, next) {
        var token = req.headers['authorization'];
        var processingTime = timeUtils.getDurationInMilliseconds(req.timeOfRequest);
        if (!token) {
            res.status(401).json({
                statusCode: 401,
                message: "Accesso não autorizado.",
                result: null,
                processingTime: processingTime
            });
        } else {
            token = token.split(" ")[1];
            try {
                var decoded = jwt.verify(token, process.env.JWT_KEY);
                if (!decoded) {
                    return res.status(401).json({
                        statusCode: 401,
                        message: "Accesso não autorizado.",
                        result: null,
                        processingTime: processingTime
                    });
                } else {
                    req.token = {
                        email: decoded.email,
                        userId: decoded.userId,
                        name: decoded.name
                    };
                    next();
                }
            } catch (error) {
                return res.status(401).json({
                    statusCode: 401,
                    message: "Accesso não autorizado.",
                    result: null,
                    processingTime: processingTime
                });
            }
        }
    }

    return {
        middleware
    }
}

module.exports = authMiddleware().middleware;