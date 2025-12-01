import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageContent from "../components/PageContent";
import { db, ref, get, child } from "../firebase";
import { useAuth } from "../auth/AuthContext";
import { CATALOG_BY_KEY } from "../data/workoutCatalog";

function WorkoutDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      if (!user || id === "custom") return setData({ name: "Custom Workout" });
      const snap = await get(child(ref(db), `workouts/${user.uid}/${id}`));
      setData(snap.exists() ? snap.val() : null);
    }
    load();
  }, [user, id]);

  if (!data)
    return (
      <PageContent title="Workout">
        <p>Loading…</p>
      </PageContent>
    );

  const cat = data.catalogKey ? CATALOG_BY_KEY[data.catalogKey] : null;

  return (
    <PageContent title={data.name || "Workout"}>
      {cat && (
        <div style={{ marginBottom: "1rem" }}>
          <img
            src={cat.image}
            alt={cat.name}
            style={{
              maxWidth: "560px",
              width: "100%",
              height: "auto",
              borderRadius: "10px",
              boxShadow: "0 6px 16px rgba(0,0,0,.35)",
            }}
          />
        </div>
      )}

      <p>
        Default: {data.defaultSets || "-"}×{data.defaultReps || "-"}{" "}
        {data.defaultWeight ? `@ ${data.defaultWeight}` : ""}
      </p>

      {cat && (
        <p style={{ opacity: 0.9 }}>
          Muscle Group: {cat.muscleGroup} • Equipment: {cat.equipment}
        </p>
      )}

      <p>
        <Link to="/dashboard">← Back to Dashboard</Link>
      </p>
    </PageContent>
  );
}

export default WorkoutDetail;
