const { createUserService, loginService } = require("../services/userService");

const createUser = async(req,res) => {
    const {userName, email, password} = req.body;
    const data = await createUserService(userName, email, password);

    return res.status(200).json(data)
}

const handleLogin = async(req,res) => {
    const {email, password} = req.body;
    const data = await loginService(email, password);
    return res.status(200).json(data)
}


module.exports = {
    createUser, handleLogin

}