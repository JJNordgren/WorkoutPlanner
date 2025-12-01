import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import classes from "./AuthForm.module.css";

function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const loc = useLocation();
  const from = loc.state?.from?.pathname || "/dashboard";

  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      await signIn(form.email, form.password);
      navigate(from, { replace: true });
    } catch (error) {
      setErr(error.message || "Failed to sign in");
      console.error(error);
    }
  }

  return (
    <div className={classes.wrapper}>
      <form onSubmit={handleSubmit} className={classes.card}>
        <h1 className={classes.title}>Sign In</h1>
        {err && <p className={classes.error}>{err}</p>}
        <input
          className={classes.input}
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className={classes.input}
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className={classes.button} type="submit">
          Sign In
        </button>
        <p className={classes.muted}>
          Don’t have an account?{" "}
          <Link to="/register" className={classes.link}>
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
