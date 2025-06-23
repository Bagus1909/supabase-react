import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const email = (
      e.currentTarget.elements.namedItem("email") as HTMLInputElement
    ).value;
    const password = (
      e.currentTarget.elements.namedItem("password") as HTMLInputElement
    ).value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      alert(error.message);
    } else {
      alert("Login successful!");
      const navigate = useNavigate();
      navigate("/dashboard");
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
    setLoading(false);
    if (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="min-w-2xl mx-auto border p-5">
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleEmailLogin}>
          <div className="mb-3">
            <label>
              Email
              <input
                type="email"
                name="email"
                required
                className="rounded-lg border w-full p-3"
                disabled={loading}
              />
            </label>
          </div>
          <div className="mb-3">
            <label>
              Password
              <input
                type="password"
                name="password"
                required
                className="rounded-lg border w-full p-3"
                disabled={loading}
              />
            </label>
          </div>
          <button
            type="submit"
            style={{ width: "100%", padding: 8 }}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        <hr style={{ margin: "24px 0" }} />
        <button
          onClick={handleGoogleLogin}
          style={{
            width: "100%",
            padding: 8,
            background: "#4285F4",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
          disabled={loading}
        >
          {loading ? "Loading..." : "Login with Google"}
        </button>
      </div>
    </div>
  );
};

export default Login;
