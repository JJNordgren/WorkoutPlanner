import PageContent from "../components/PageContent";
import WeeklyPlan from "../components/WeeklyPlan";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <PageContent title="Your Weekly Plan">
      <p>
        Plan your week and mark workouts complete.{" "}
        <Link to="/workouts/new">Create a workout</Link>
      </p>
      <WeeklyPlan />
    </PageContent>
  );
}

export default Dashboard;
