import { useState } from "react";
import { db, ref, push } from "../firebase";
import { useAuth } from "../auth/AuthContext";
import Logo from "./Logo";
import classes from "./ContactForm.module.css";

function ContactForm() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleBlur(e) {
    setTouched({ ...touched, [e.target.name]: true });
  }

  const emailOk =
    /^\S+@\S+\.\S+$/.test(form.email.trim()) || form.email.trim() === "";
  const invalid = (key) =>
    touched[key] && (form[key].trim() === "" || (key === "email" && !emailOk));

  const isValid =
    form.name.trim() && form.email.trim() && emailOk && form.message.trim();

  async function handleSubmit(e) {
    e.preventDefault();
    setSent(false);

    if (!isValid) {
      setTouched({ name: true, email: true, message: true });
      return;
    }

    try {
      setSending(true);
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        userId: user?.uid ?? null,
        createdAt: Date.now(),
      };

      const newRef = await push(ref(db, "contactMessages"), payload);

      console.log("✅ Contact message sent.");
      console.log("key:", newRef.key);
      console.log("data:", payload);

      setForm({ name: "", email: "", message: "" });
      setTouched({});
      setSent(true);
    } catch (err) {
      console.error("❌ Failed to send contact message:", err);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className={classes.wrapper}>
      <Logo size="lg" />
      <form onSubmit={handleSubmit} className={classes.form} noValidate>
        <h2 className={classes.title}>Contact HabitLift</h2>

        <label className={classes.label}>
          Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={invalid("name") ? classes.invalid : ""}
            placeholder="Your name"
            autoComplete="name"
          />
          {invalid("name") && (
            <p className={classes.error}>Name is required.</p>
          )}
        </label>

        <label className={classes.label}>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={invalid("email") ? classes.invalid : ""}
            placeholder="you@example.com"
            autoComplete="email"
          />
          {invalid("email") && (
            <p className={classes.error}>Enter a valid email address.</p>
          )}
        </label>

        <label className={classes.label}>
          Message
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            onBlur={handleBlur}
            className={invalid("message") ? classes.invalid : ""}
            placeholder="How can we help?"
            rows={6}
          />
          {invalid("message") && (
            <p className={classes.error}>Message is required.</p>
          )}
        </label>

        <div className={classes.actions}>
          <button type="submit" disabled={!isValid || sending}>
            {sending ? "Sending..." : "Send Message"}
          </button>
          {sent && <p className={classes.success}>Message sent — thank you!</p>}
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
