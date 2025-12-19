import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [lowStock, setLowStock] = useState(5);

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async () => {
    await api.post("/products", {
      name,
      sku,
      quantity,
      lowStock
    });

    setName("");
    setSku("");
    setQuantity(0);
    fetchProducts();
  };

  return (
    <div className="container">
      <h1>Products</h1>

      <div className="card">
        <h2>Add Product</h2>

        <input
          placeholder="Product Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          placeholder="SKU"
          value={sku}
          onChange={e => setSku(e.target.value)}
        />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={e => setQuantity(Number(e.target.value))}
        />

        <input
          type="number"
          placeholder="Low Stock Threshold"
          value={lowStock}
          onChange={e => setLowStock(Number(e.target.value))}
        />

        <button className="btn btn-green" onClick={addProduct}>
          Add Product
        </button>
      </div>

      <div className="card">
        <h2>Product List</h2>

        {products.length === 0 ? (
          <p>No products added yet</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>SKU</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.sku}</td>
                  <td>{p.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
