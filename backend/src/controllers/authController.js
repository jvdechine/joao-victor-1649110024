const authService = require('../services/authService')();

function authController(){
    async function authenticate(req, res, next){
        var result = await authService.authenticate(req.body.email, req.body.password);
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

    async function refreshToken(req, res, next){
        var result = await authService.refreshToken(req.headers['authorization']);
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

    async function isAuthenticated(req, res, next){
        req._operation = "SELECT";
        req._result = {
            name: req.token.name
        };
        next();
    }

    return {
        authenticate,
        refreshToken,
        isAuthenticated
    }
}

module.exports = authController;