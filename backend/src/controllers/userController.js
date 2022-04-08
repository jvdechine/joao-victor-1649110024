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

    return {
        signUp
    }
}

module.exports = userController;