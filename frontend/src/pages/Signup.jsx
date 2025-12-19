import { useState } from "react";
import api from "../api/axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orgName, setOrgName] = useState("");

  const handleSignup = async () => {
    try{
        await api.post("/auth/signup", { email, password, orgName });
        window.location.href = "/";
    }catch(err){
        alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded w-80">
        <h2 className="text-xl font-bold mb-4">Signup</h2>
        <input
          className="border p-2 w-full mb-2"
          placeholder="Organization Name"
          onChange={(e) => setOrgName(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="border p-2 w-full mb-2"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        

        <button
          className="bg-black text-white w-full p-2"
          onClick={handleSignup}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}
