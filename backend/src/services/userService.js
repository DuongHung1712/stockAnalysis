const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10; 
const jwt = require("jsonwebtoken");
require ("dotenv").config();
const createUserService = async (userName, email, password) => {
    try {
        // Check user exist
        const user = await User.findOne({email});
        if (user) {
            console.log("User already exists, please choose other email");
            return null;
        }

        //hash user password
        const hashedPassword = await bcrypt.hash(password,saltRounds);
        let result = await User.create({
            name: userName,
            email: email,
            password: hashedPassword,
            role: "user"
        })
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}
const loginService = async (email, password) => {
    try {
        //fetch user by email
        const user = await User.findOne({email: email}).exec();
        if (user){
            //compare password 
            const isMatchPassword = await bcrypt.compare(password,user.password);
            if (!isMatchPassword){
                return{
                    EC: 2,
                    EM: "Wrong password"
                }
    
            }else{
                //Create access token
                const payload = {
                    email: user.email,
                    name: user.name
                }
                const access_token = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRE 
                    }

                );
                return {
                    EC: 0,
                    access_token,
                    user: {
                        email: user.email,
                        name: user.name
                    }
                };
            }
        }else{
            return {
                EC: 1,
                EM: "Email/Password not valid"
            }
        }
        
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}
const getUserService = async () => {
    try {
       
        let result = await User.find({}).select("-password")
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}



module.exports = {
    createUserService, loginService, getUserService
}