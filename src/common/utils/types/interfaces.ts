import { Document } from "mongoose";

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	role: "admin" | "user";
	createdAt: Date;
	updatedAt: Date;
}

export interface AuthUser {
	_id: IUser["_id"]; // Lookup type
	name: string;
	email: string;
	role: string;
}

export interface LoginResult {
	token: string;
	user: AuthUser;
}

/** User attached to `req` after auth; never includes password. */
export interface AuthenticatedUser {
	id: string;
	name: string;
	email: string;
	role: "admin" | "user";
}

export interface UpdateUserData {
	name?: string;
	email?: string;
	role?: "admin" | "user";
}

export interface JwtPayload {
	id: string;
}
