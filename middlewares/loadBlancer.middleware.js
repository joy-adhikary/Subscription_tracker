import { AJ } from "../config/arcjet.js";

export const loadBlancerMiddleware = async (req, res, next) => {
    try {
        const decision = await AJ.protect(req, {userHost: req.headers.host, requested: 2 });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({
                    error: "Too Many Requests"
                })
            }
            if (decision.reason.isBot()) {
                return res.status(403).json({
                    error: "No bots allowed"
                })
            }

            return res.status(403).json({
                error: "Access Denied"
            })
        }

        next();
    } catch (error) {
        console.log("Error in loadBlancerMiddleware", error);
        next(error);
    }
}

export default loadBlancerMiddleware;