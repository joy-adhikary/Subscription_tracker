import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { ARCJET_KEY } from "./env.js";

export const AJ = arcjet({
    key: ARCJET_KEY,
    // characteristics: ["ip.src"],
    characteristics: ["userHost"], // for testing purposes
    rules: [
        shield({ mode: "LIVE" }),
        detectBot({
            // mode: "LIVE",
            mode: "DRY_RUN", // for testing purposes
            allow: [
                "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
            ],
        }),
        tokenBucket({
            mode: "LIVE",
            refillRate: 5, // Refill 5 tokens per interval
            interval: 10, // Refill every 10 seconds
            capacity: 10, // Bucket capacity of 10 tokens
        }),
    ],
});
