const bcrypt = require("bcryptjs");

const userRepository = require('../repositories/userRepository')();

function userService(){
    async function signUp(name, phoneNumber, email, password){
        if(!name || !email || !password){
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

    return {
        signUp
    }
}

module.exports = userService;