import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-black text-white px-6 py-3 flex justify-between items-center">
      <h1 className="font-bold text-lg">StockFlow</h1>

      <div className="space-x-4">
        <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link to="/products" className="hover:underline">
          Products
        </Link>
        <button
          onClick={logout}
          className="bg-red-600 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
