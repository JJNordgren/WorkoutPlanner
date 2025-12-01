import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import classes from "./AuthForm.module.css";

function Register() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [err, setErr] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    if (form.password !== form.confirm) {
      setErr("Passwords do not match");
      return;
    }
    try {
      await signUp(form.email, form.password);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setErr(error.message || "Failed to register");
      console.error(error);
    }
  }

  return (
    <div className={classes.wrapper}>
      <form onSubmit={handleSubmit} className={classes.card}>
        <h1 className={classes.title}>Create Account</h1>
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
        <input
          className={classes.input}
          name="confirm"
          type="password"
          placeholder="Confirm Password"
          value={form.confirm}
          onChange={handleChange}
          required
        />
        <button className={classes.button} type="submit">
          Sign Up
        </button>
        <p className={classes.muted}>
          Already have an account?{" "}
          <Link to="/login" className={classes.link}>
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
