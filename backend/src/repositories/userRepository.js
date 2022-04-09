const mongoose = require('mongoose');

const User = require('../models/userModel');

function userRepository(){
    async function getUserByEmail(email){
        try{
            var user = await User.find({email});
            return {
                status: true,
                result: user
            }
        }catch(err){
            return {
                status: false,
                result: err
            }
        }
    }

    async function createUser(name, phoneNumber, email, password, hash){
        try{
            var hasUser = await this.getUserByEmail(email);
            if(hasUser.status && hasUser.result.length == 0){
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    name: name,
                    email: email,
                    phoneNumber: phoneNumber,
                    password: hash,
                    date: new Date()
                });
                await user.save();   
                return {
                    status: true,
                    result: "Usuário cadastrado com sucesso!"
                }
            }else{
                return {
                    status: false,
                    result: "E-mail já cadastrado!"
                }
            }
        }catch(err){
            return {
                status: false,
                result: err
            }
        }
    }

    return {
        getUserByEmail,
        createUser
    }
}

module.exports = userRepository;