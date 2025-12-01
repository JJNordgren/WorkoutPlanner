import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import PageContent from "../components/PageContent";
import styles from "./HomePage.module.css";
import Logo from "../components/Logo";

function HomePage() {
  const { user } = useAuth();

  return (
    <PageContent>
      <section className={styles.hero}>
        <Logo size="xl" />
        <h1 className={styles.title}>Build habits. Lift consistently.</h1>
        <p className={styles.subtitle}>
          Plan your week, check off workouts, and keep momentum—your routine,
          your way.
        </p>

        <div
          className={styles.ctaRow}
          role="group"
          aria-label="Primary actions"
        >
          {user ? (
            <>
              <Link to="/dashboard" className={styles.ctaPrimary}>
                Go to Dashboard
              </Link>
              <Link to="/workouts/new" className={styles.ctaSecondary}>
                Plan a Workout
              </Link>
            </>
          ) : (
            <>
              <Link to="/register" className={styles.ctaPrimary}>
                Get Started
              </Link>
              <Link to="/login" className={styles.ctaSecondary}>
                I already have an account
              </Link>
            </>
          )}
        </div>

        <div className={styles.quickLinks}>
          <Link to="/about">About</Link>
          <span>•</span>
          <Link to="/contact">Contact</Link>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.card}>
          <h3>Plan the Week</h3>
          <p>
            Add workouts to any day. Switch between a clean timeline or compact
            calendar.
          </p>
          <Link to="/dashboard" className={styles.cardLink}>
            Open Weekly Plan →
          </Link>
        </div>

        <div className={styles.card}>
          <h3>Finish the Day</h3>
          <p>
            Check off items, then complete the day to boost your session
            counter.
          </p>
          <Link to="/dashboard" className={styles.cardLink}>
            View Today →
          </Link>
        </div>

        <div className={styles.card}>
          <h3>Your Way</h3>
          <p>
            Pick from the workout catalog with images—or add custom moves and
            weights.
          </p>
          <Link to="/workouts/new" className={styles.cardLink}>
            Create a Workout →
          </Link>
        </div>
      </section>

      <section className={styles.microCta}>
        <p>
          Routines stick when they’re simple. Start this week’s plan and check
          off your first day.
        </p>
        <div className={styles.ctaRow}>
          {user ? (
            <Link to="/dashboard" className={styles.ctaPrimary}>
              Start This Week
            </Link>
          ) : (
            <Link to="/register" className={styles.ctaPrimary}>
              Join HabitLift
            </Link>
          )}
        </div>
      </section>
    </PageContent>
  );
}

export default HomePage;
