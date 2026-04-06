import { useEffect, useState } from "react";
import api from "../services/api.ts";
import type { Product } from "../types/interfaces.ts";

const Products = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [deletingId, setDeletingId] = useState<string | null>(null);

	// ─── Fetch Products on Mount ────────────────────────────────────────────────
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const { data } = await api.get("/products");
				setProducts(data.data.products);
			} catch (err: any) {
				setError(err.response?.data?.message || "Failed to load products");
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	// ─── Delete Product ─────────────────────────────────────────────────────────
	const handleDelete = async (productId: string) => {
		setDeletingId(productId);

		try {
			await api.delete(`/products/${productId}`);
			setProducts((prev) =>
				prev.filter((product) => product._id !== productId),
			);
		} catch (err: any) {
			setError(err.response?.data?.message || "Failed to delete product");
		} finally {
			setDeletingId(null);
		}
	};

	// ─── Render ─────────────────────────────────────────────────────────────────
	if (loading) return <p>Loading...</p>;
	if (error) return <p style={{ color: "red" }}>{error}</p>;

	return (
		<div>
			<h2>Products</h2>

			{products.length === 0 ? (
				<p>No products found.</p>
			) : (
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Price</th>
							<th>Stock</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr key={product._id}>
								<td>{product.name}</td>
								<td>${product.price}</td>
								<td>{product.stock}</td>
								<td>
									<button
										onClick={() => handleDelete(product._id)}
										disabled={deletingId === product._id}
									>
										{deletingId === product._id ? "Deleting..." : "Delete"}
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

export default Products;
