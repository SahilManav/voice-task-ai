import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await register(form);

      toast.success("Registration successful!");

      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#161D2F] rounded-3xl p-8 border border-gray-700">
        <h1 className="text-5xl font-bold text-center text-white mb-10">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="text-white block mb-2">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl bg-[#0B1120] border border-cyan-500 px-4 py-3 text-white outline-none"
            />
          </div>

          <div>
            <label className="text-white block mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-xl bg-[#0B1120] border border-cyan-500 px-4 py-3 text-white outline-none"
            />
          </div>

          <div>
            <label className="text-white block mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full rounded-xl bg-[#0B1120] border border-cyan-500 px-4 py-3 pr-12 text-white outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-cyan-400 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 transition rounded-xl py-3 font-semibold"
          >
            {loading ? "Creating..." : "Register"}
          </button>

        </form>

        <p className="text-center text-gray-300 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-400 font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}