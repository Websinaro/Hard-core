import argon2 from "argon2";
import { prisma } from "../../database/prisma";
import { RegisterInput } from "./auth.schema";

export async function registerUser(input: RegisterInput) {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: input.email,
        },
    });
    
    if(existingUser) {
        throw new Error("Unable To Create Account");
    }
    
    const passwordHash = await argon2.hash(input.password, {
        type: argon2.argon2id,
    });
    
    const user = await prisma.user.create({
        data: {
            name: input.name,
            email: input.email,
            phoneNumber: input.phoneNumber,
            passwordHash,
        },
        select: {
            id: true,
            name: true,
            email: true,
            phoneNumber: true,
            role: true,
            createdAt: true,
            lastLogin: true,
        },
    });
    
    return user;
}