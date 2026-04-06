export interface DashboardStats {
	totalUsers: number;
	totalProducts: number;
}

export interface User {
	_id: string;
	name: string;
	email: string;
	role: "admin" | "user";
}

export interface Product {
	_id: string;
	name: string;
	price: number;
	stock: number;
}
