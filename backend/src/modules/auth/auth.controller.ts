import { Request,Response,NextFunction } from "express";
import { registerSchema } from "./auth.schema";
import { registerUser } from "./auth.service";

export async function registerController(
    req: Request,
    res: Response,
    next: NextFunction
    ) {
        try{
            const input = registerSchema.parse(req.body);
            
            const user = await registerUser(input);
            
            return res.status(201).json({
                success: true,
                data: {
                    user,
                },
            });
        } catch (error){
            next(error);
        }
    }