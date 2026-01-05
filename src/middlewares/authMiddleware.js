import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    let token = req.cookies['token'];
    
    if (!token) {
        return res.status(401).json({ status: "fail", message: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ status: "fail", message: "Invalid Token" });
        } else {
            req.headers['user_id'] = decoded['id']; // টোকেন থেকে আইডি হেডারে পাস করা
            next();
        }
    });
};
export default authMiddleware;