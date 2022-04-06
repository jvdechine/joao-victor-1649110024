const userService = require('../services/userService')();

function userController(){
    async function signUp(req, res, next){
        var result = await userService.signUp(req.body.name, req.body.phoneNumber, req.body.email, req.body.password);
        if (result.status) {
            req._operation = "SELECT";
            req._result = result.result;
        } else {
            req._result = undefined;
            req._operation = "ERROR";
            req._statusCode = 400;
            req._message = result.result;
        }
        next();
    }

    async function login(req, res, next){
        var result = await userService.login(req.body.email, req.body.password);
        if (result.status) {
            req._operation = "SELECT";
            req._result = result.result;
        } else {
            req._result = undefined;
            req._operation = "ERROR";
            req._statusCode = 400;
            req._message = result.result;
        }
        next();
    }

    return {
        signUp,
        login
    }
}

module.exports = userController;
/*
exports.user_login = (req, res, next) => {
    
};

exports.user_refresh_token = (req, res, next) => {
    try{
        const decodeToken = jwt.decode(req.body.token);
        const token = jwt.sign(
            {
                email: decodeToken.email,
                userId: decodeToken.userId
            }, 
            process.env.JWT_KEY ,
            {
                expiresIn: "1h"
            },
        );
        return res.status(200).json({
            message: 'Authentication sucessful',
            token: token
        });
    }catch(err){
        
        return res.status(401).json({
            message: 'Authentication Failed'
        });
    }
};
*/