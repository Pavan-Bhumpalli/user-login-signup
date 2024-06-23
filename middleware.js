const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).send("please login");
    }
    try {
        const decoded = jwt.verify(token, 'vrikshayan');
        req.user = decoded.user;
        next();
    } catch (err) {
        return res.status(401).send("Token is not valid");
    }
}