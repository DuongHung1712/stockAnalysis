const jwt = require("jsonwebtoken")
require("dotenv").config();

const auth = (req, res, next) => {
    const white_lists = ["/", "/login", "/register"];
    console.log(req.originalUrl)
    if (white_lists.find(item => '/v1/api' + item === req.originalUrl)) {
        next();
    } else {
        if (req.headers && req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = {
                    email: decoded.email,
                    name: decoded.name,
                    createby: "DuongHung"
                }
                console.log("Decoded: ", decoded);
                next();
            } catch (error) {
                return res.status(401).json({
                    message: "Token unauthorized"
                })
            }
            // Verify token here if needed
        } else {
            //return exception
            return res.status(401).json({
                message: "Token unauthorized"
            })
        }
    }


}
module.exports = auth;