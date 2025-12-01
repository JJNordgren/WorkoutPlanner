import { Link } from "react-router-dom";
import PageContent from "../components/PageContent";
import Logo from "../components/Logo";
import { useAuth } from "../auth/AuthContext";
import styles from "./AboutPage.module.css";

function AboutPage() {
  const { user } = useAuth();

  return (
    <PageContent>
      <section className={styles.hero}>
        <Logo size="lg" />
        <h2 className={styles.tagline}>Your routine, made simple.</h2>
        <p className={styles.lead}>
          HabitLift helps you plan your weekly workouts, check them off, and
          build consistency—without the clutter.
        </p>
      </section>

      <section className={styles.section}>
        <h3 className={styles.h3}>What HabitLift does</h3>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h4>Plan the week</h4>
            <p>
              Add workouts to any day using a simple timeline or compact
              calendar. Keep everything in one place.
            </p>
          </div>
          <div className={styles.card}>
            <h4>Check off progress</h4>
            <p>
              Mark each exercise as completed, then finish the day to record a
              session. Watch your weekly streak grow.
            </p>
          </div>
          <div className={styles.card}>
            <h4>Use a workout catalog</h4>
            <p>
              Choose from a visual catalog (with images) or create your own
              custom workouts—your plan, your way.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.h3}>How it works</h3>
        <ol className={styles.steps}>
          <li>
            <span className={styles.stepNum}>1</span>
            <div>
              <strong>Create your plan.</strong> Add workouts to the days you
              want to train this week.
            </div>
          </li>
          <li>
            <span className={styles.stepNum}>2</span>
            <div>
              <strong>Do the work.</strong> Check off each exercise as you
              complete it.
            </div>
          </li>
          <li>
            <span className={styles.stepNum}>3</span>
            <div>
              <strong>Complete the day.</strong> When everything’s done, finish
              the day to log a session and keep momentum.
            </div>
          </li>
        </ol>
      </section>

      <section className={styles.section}>
        <h3 className={styles.h3}>Why people like it</h3>

        <p>
          <strong>Simple:</strong> No complicated dashboards—just the week in
          front of you.
        </p>
        <p>
          <strong>Flexible:</strong> Catalog workouts or custom ones—mix and
          match freely.
        </p>
        <p>
          <strong>Motivating:</strong> Daily completion gives a clear sense of
          progress.
        </p>
      </section>

      <section className={styles.section}>
        <h3 className={styles.h3}>Privacy</h3>
        <p className={styles.text}>
          Your plan is saved to your account so it’s available across devices.
          We only store what’s needed to make HabitLift work for you.
        </p>
      </section>

      <section className={styles.ctaBand}>
        <p className={styles.ctaText}>Ready to make a plan you’ll stick to?</p>
        <div className={styles.ctaRow}>
          {user ? (
            <>
              <Link to="/dashboard" className={styles.ctaPrimary}>
                Go to your dashboard
              </Link>
              <Link to="/workouts/new" className={styles.ctaSecondary}>
                Add a workout
              </Link>
            </>
          ) : (
            <>
              <Link to="/register" className={styles.ctaPrimary}>
                Create an account
              </Link>
              <Link to="/login" className={styles.ctaSecondary}>
                I already have one
              </Link>
            </>
          )}
          <Link to="/contact" className={styles.ctaLink}>
            Questions? Contact us →
          </Link>
        </div>
      </section>
    </PageContent>
  );
}

export default AboutPage;
