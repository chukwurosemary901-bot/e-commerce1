import { config } from "../config/env.js";

export const corsOptions = {
    origin: (origin, callback) => {
        if(!origin || config.origins.includes(origin)){
            callback(null, true)
        }else{
            console.log((`Bolcked by CORS: ${origin}`));
            callback(null, false)
        }
    },

methods: "GET, HEAD, PUT, PATCH, POST , DELETE",
allowHeaders: ["Content-Type", "Authorization"],
credentials: true
}
