const userRepository = require('../repositories/userRepository')();

const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

function authService(){

    async function authenticate(email, password){

        if(!email || !password){
            return {
                status: false,
                result: 'Um ou mais campos não foram preenchidos.'
            }
        }

        try{
            var user = await userRepository.getUserByEmail(email);
            if(!user.status || user.result.length < 1){
                return {
                    status: false,
                    result: 'Não foi possível realizar o login. Por favor, revise seu usuário e/ou senha.'
                }
            }else{
                var result = await bcrypt.compare(password, user.result[0].password);
                if(result){
                    const token = jwt.sign(
                        {
                            email: user.result[0].email,
                            userId: user.result[0]._id,
                            name: user.result[0].name
                        }, 
                        process.env.JWT_KEY ,
                        {
                            expiresIn: "1h"
                        },
                    );
                    return {
                        status: true,
                        result: {
                            name: user.result[0].name,
                            _id: user.result[0]._id,
                            token: token
                        }
                    };
                }else{
                    return {
                        status: false,
                        result: 'Não foi possível realizar o login. Por favor, revise seu usuário e/ou senha.'
                    }
                }
            }
        }
        catch(err){
            return {
                status: false,
                result: err
            }
        }
    }

    async function refreshToken(tokenHeaders){
        try{
            const decodeToken = jwt.decode(tokenHeaders.split(" ")[1]);
            const token = jwt.sign(
                {
                    email: decodeToken.email,
                    userId: decodeToken.userId,
                    name: decodeToken.name
                }, 
                process.env.JWT_KEY ,
                {
                    expiresIn: "1h"
                },
            );
            return {
                status: true,
                result: token
            }
        }catch(err){
            return {
                status: false,
                result: 'Accesso não autorizado.'
            }
        }
    }

    return {
        authenticate,
        refreshToken
    }
}

module.exports = authService;