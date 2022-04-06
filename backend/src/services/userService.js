const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const userRepository = require('../repositories/userRepository')();

function userService(){
    async function signUp(name, phoneNumber, email, password){
        if(!name || !phoneNumber || !email || !password){
            return {
                status: false,
                result: 'Um ou mais campos não foram preenchidos.'
            }
        }

        try{
            var user = await userRepository.getUserByEmail(email, password);
            if(!user.status || user.result.length >= 1){
                return {
                    status: false,
                    result: 'Não foi possível cadastrar o usuário!'
                }
            }
            else{
                var hash = await bcrypt.hash(password, 10)
                return await userRepository.createUser(name, phoneNumber, email, password, hash);
            }
        }
        catch(err){
            return {
                status: false,
                result: err
            }
        }
    }

    async function login(email, password){

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
                            userId: user.result[0]._id
                        }, 
                        process.env.JWT_KEY ,
                        {
                            expiresIn: "24h"
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

    return {
        signUp,
        login
    }
}

module.exports = userService;