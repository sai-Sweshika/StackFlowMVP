import api from "../api/axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [summary, setSummary] = useState({
    totalProducts: 0,
    totalQuantity: 0,
    lowStock: []
  });

  useEffect(() => {
    api.get("/products/summary").then(res => {
      setSummary(res.data);
    });
  }, []);

  return (
    <div className="container">
      <h1>Dashboard</h1>

      <div className="card">
        <p>Total Products: <b>{summary.totalProducts}</b></p>
        <p>Total Quantity: <b>{summary.totalQuantity}</b></p>
      </div>

      <div className="card">
        <h2>Low Stock Items</h2>

        {summary.lowStock.length === 0 ? (
          <p>🎉 No low stock items</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>SKU</th>
                <th>Qty</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {summary.lowStock.map(p => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.sku}</td>
                  <td>{p.quantity}</td>
                  <td>
                    <span className="badge badge-low">Low Stock</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
