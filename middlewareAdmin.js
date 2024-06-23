const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).send("please login");
    }
    try {
        const decoded = jwt.verify(token, 'vrikshayan');
        req.user = decoded.user;
        if(req.user.id!=="66785e95a077edaafa7f757b")
        {
            return res.status(401).send("You are not authorized to access this route");
        }
        next();
    } catch (err) {
        return res.status(401).send("Token is not valid");
    }
}