import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import API from "../services/api"; 

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // show errors
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/users/login", { email, password });
      localStorage.setItem("jwtToken", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="h-screen w-full flex items-center justify-center bg-cover bg-center px-4 sm:px-6 md:px-8"
      style={{
        backgroundImage: `url(https://media.istockphoto.com/id/1495542786/photo/aurora-borealis.webp?a=1&b=1&s=612x612&w=0&k=20&c=6RGlA_cQ0oO0tIz9MjL7IvVIZMxwPipAi1oqyKcDyvs=)`,
      }}
     >
      <div className="w-full max-w-md p-8 sm:p-10 rounded-2xl backdrop-blur-md bg-white/10 border border-white/40 text-white">
        
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10">Login</h2>

        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 ">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-b border-white px-2 outline-none py-2 placeholder-white"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border-b border-white px-2  outline-none py-2  placeholder-white"
            required
          />

          

          <button className="w-full bg-white text-black py-3  rounded-full font-semibold hover:text-white  hover:bg-fuchsia-900 transition">
            Log in
          </button>
        </form>

        
      </div>
    </div>
  );
}

export default LoginForm;