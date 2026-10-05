import "dotenv/config";
import { z } from "zod";

const configSchema = z.object({
    NODE_ENV: z.enum(["development","test","production"]).default("development"),
    
    PORT: z.coerce.number().int().positive().default(5000),
    
    DATABASE_URL: z.string().min(1,"Database url is mandoratory"),
    
    JWT_ACCESS_SECRET: z.string().min(32, "Jwt secret mjst contain 3w character"),
    
    JWT_REFRESH_SECRET: z.string().min(32,"Jwt secret mjst contain 3w character"),
    
    FRONTEND_URL: z.string().url("url must wanted"),
});

const result = configSchema.safeParse(process.env);
if(!result.success){
    console.error("Invalid enviornment setup");
    
    console.error(result.error.flatten().fieldErrors);
    
    process.exit(1);
}

export const config = {
    nodeEnv: result.data.NODE_ENV,
    port: result.data.PORT,
    databaseUrl: result.data.DATABASE_URL,
    jwtAccessSecret: result.data.JWT_ACCESS_SECRET,
    jwtRefreshSecret: result.data.JWT_REFRESH_SECRET,
    frontendUrl: result.data.FRONTEND_URL,
};