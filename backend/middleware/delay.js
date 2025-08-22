
const delay = (req, res, next) => {
    setTimeout(() => {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            // Verify token here if needed
        }
        next();
    }, 3000);

}
module.exports = delay;