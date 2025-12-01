import { Link } from "react-router-dom";
import classes from "./Logo.module.css";

function Logo({ size = "md" }) {
  return (
    <Link
      to="/"
      className={`${classes.logo} ${classes[size]}`}
      aria-label="HabitLift — Home"
    >
      <span className={classes.habit}>Habit</span>
      <span className={classes.lift}>Lift</span>
      <svg
        className={classes.icon}
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M7 17l10-10M10 7h7v7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}

export default Logo;
