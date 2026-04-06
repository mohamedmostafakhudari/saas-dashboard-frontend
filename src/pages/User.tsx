import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api.ts";
import type { User } from "../types/interfaces.ts";

const Users = () => {
	const [searchParams] = useSearchParams();

	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [deletingId, setDeletingId] = useState<string | null>(null);

	// ─── Fetch Users on Mount ───────────────────────────────────────────────────
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const page = searchParams.get("page");
				const limit = searchParams.get("limit");

				const { data } = await api.get(`/users?page=${page}&limit=${limit}`);
				setUsers(data.data.users);
			} catch (err: any) {
				setError(err.response?.data?.message || "Failed to load users");
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, []);

	// ─── Delete User ────────────────────────────────────────────────────────────
	const handleDelete = async (userId: string) => {
		setDeletingId(userId);

		try {
			await api.delete(`/users/${userId}`);
			setUsers((prev) => prev.filter((user) => user._id !== userId));
		} catch (err: any) {
			setError(err.response?.data?.message || "Failed to delete user");
		} finally {
			setDeletingId(null);
		}
	};

	// ─── Render ─────────────────────────────────────────────────────────────────
	if (loading) return <p>Loading...</p>;
	if (error) return <p style={{ color: "red" }}>{error}</p>;

	return (
		<div>
			<h2>Users</h2>

			{users.length === 0 ? (
				<p>No users found.</p>
			) : (
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Role</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user._id}>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>{user.role}</td>
								<td>
									<button
										onClick={() => handleDelete(user._id)}
										disabled={deletingId === user._id}
									>
										{deletingId === user._id ? "Deleting..." : "Delete"}
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default Users;
