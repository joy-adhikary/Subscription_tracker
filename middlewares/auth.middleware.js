import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
    try {
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]; // get the bearer token from the Authorization header
        }

        if(!token) {
            return res.status(401).json({ success: false, message: 'Not authorized to access this route' });
        }

        // Verify the token
        const decodedData = jwt.verify(token, JWT_SECRET);

        // Get the user from the token
        const user = await User.findById(decodedData.userId).select('-password'); // Exclude the password field from the user object

        // Attach the user to the request object
        req.user = user;
        
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
}

export default authMiddleware;