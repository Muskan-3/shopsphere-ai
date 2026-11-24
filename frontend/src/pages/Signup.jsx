
import { useState } from "react";
import api from "../api/axios";

export default function Signup() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        setMsg("");
        setIsError(false);
        setLoading(true);

        try {
            const res = await api.post("/auth/signup", form);

            setMsg(res.data.message);
            setIsError(false);

            // Clear form after successful signup
            setForm({
                name: "",
                email: "",
                password: ""
            });

        } catch (error) {

            console.error("Signup Error:", error);
            console.error("Error Response:", error.response?.data);

            setIsError(true);

            if (error.response) {
                setMsg(
                    error.response.data.message || "Signup failed"
                );
            } else if (error.request) {
                setMsg("Cannot connect to server. Please try again.");
            } else {
                setMsg(error.message || "Something went wrong");
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-100 px-4">

            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">

                <h2 className="text-2xl font-bold text-center mb-6">
                    Create Account
                </h2>

                {msg && (
                    <div
                        className={`mb-4 text-center text-sm font-medium ${
                            isError ? "text-red-600" : "text-green-600"
                        }`}
                    >
                        {msg}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded mb-4"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded mb-4"
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded mb-4"
                        required
                        minLength={6}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 disabled:bg-gray-400"
                    >
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>

                </form>

            </div>

        </div>
    );
}
