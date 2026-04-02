import jwt from "jsonwebtoken";
import { AppError } from "../errors/app-error";
import { AuthUser, IUser } from "./types/interfaces";

// Strips the password before returning the user object
export const sanitizeUser = (user: IUser): AuthUser => ({
	_id: user._id,
	name: user.name,
	email: user.email,
	role: user.role,
});

export const generateToken = (userId: string): string => {
	const secret = process.env.JWT_SECRET;
	if (!secret) throw new AppError("JWT_SECRET is not defined", 500);

	return jwt.sign({ id: userId }, secret, { expiresIn: "7d" });
};
