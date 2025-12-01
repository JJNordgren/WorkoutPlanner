import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import PageContent from "../components/PageContent";
import { useAuth } from "../auth/AuthContext";
import { db, ref, push, set, update } from "../firebase";
import { DAY_KEYS, getWeekKey } from "../utils/date";
import styles from "./WorkoutForm.module.css";

import { WORKOUT_CATALOG, CATALOG_BY_KEY } from "../data/workoutCatalog";

function WorkoutForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const initialDay = params.get("day") || DAY_KEYS[0];
  const [weekKey] = useState(getWeekKey());

  const [form, setForm] = useState({
    catalogKey: "",
    name: "",
    sets: 3,
    reps: 10,
    weight: "",
    day: initialDay,
  });

  const [err, setErr] = useState("");

  function goBack() {
    if (window.history.length > 1) navigate(-1);
    else navigate("/dashboard", { replace: true });
  }

  useEffect(() => {
    if (!form.catalogKey) return;
    const w = CATALOG_BY_KEY[form.catalogKey];
    if (!w) return;
    setForm((f) => ({
      ...f,
      name: w.name,
      sets: w.defaults.sets,
      reps: w.defaults.reps,
      weight: w.defaults.weight,
    }));
  }, [form.catalogKey]);

  const dayOptions = useMemo(
    () =>
      DAY_KEYS.map((d) => (
        <option key={d} value={d}>
          {d}
        </option>
      )),
    []
  );

  const isValid =
    (form.catalogKey || (form.name || "").trim().length > 0) &&
    Number(form.sets) >= 1 &&
    Number(form.reps) >= 1;

  async function submit(e) {
    e.preventDefault();
    if (!user) return;

    if (!isValid) {
      setErr(
        "Please select a workout from the catalog or enter a name, and ensure sets/reps are at least 1."
      );
      return;
    }
    setErr("");

    const now = Date.now();

    const workoutRef = await push(ref(db, `workouts/${user.uid}`), {
      name: (form.name || "").trim(),
      createdAt: now,
      defaultSets: Number(form.sets),
      defaultReps: Number(form.reps),
      defaultWeight: form.weight || "",
      catalogKey: form.catalogKey || null,
    });
    const newWorkoutId = workoutRef.key;

    const planRef = push(
      ref(db, `plans/${user.uid}/weeks/${weekKey}/${form.day}`)
    );
    await set(planRef, {
      id: planRef.key,
      workoutId: newWorkoutId,
      catalogKey: form.catalogKey || null,
      name: (form.name || "").trim(),
      sets: Number(form.sets),
      reps: Number(form.reps),
      weight: form.weight || "",
      completed: false,
      createdAt: now,
    });

    await update(ref(db, `plans/${user.uid}/weeks/${weekKey}/status`), {
      [form.day]: false,
    });

    navigate("/dashboard");
  }

  const selected = form.catalogKey ? CATALOG_BY_KEY[form.catalogKey] : null;

  return (
    <PageContent title="Create Workout">
      <div className={styles.backRow}>
        <button type="button" className={styles.backBtn} onClick={goBack}>
          ← Return
        </button>
      </div>

      <form onSubmit={submit} className={styles.form}>
        {err && (
          <p className={styles.error} role="alert">
            {err}
          </p>
        )}

        <label>
          Workout (from catalog)
          <select
            value={form.catalogKey}
            onChange={(e) => setForm({ ...form, catalogKey: e.target.value })}
          >
            <option value="">— Custom / None —</option>
            {WORKOUT_CATALOG.map((w) => (
              <option key={w.key} value={w.key}>
                {w.name}
              </option>
            ))}
          </select>
        </label>

        {selected && (
          <div className={styles.preview}>
            <img src={selected.image} alt={selected.name} />
            <div>
              <h3>{selected.name}</h3>
              <p>
                {selected.muscleGroup} • {selected.equipment}
              </p>
              <p>
                Defaults: {selected.defaults.sets}×{selected.defaults.reps}
              </p>
            </div>
          </div>
        )}

        <label>
          Name{!form.catalogKey ? " (required if no catalog workout)" : ""}
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Workout name"
            required={!form.catalogKey}
          />
        </label>

        <div className={styles.row}>
          <label>
            Sets
            <input
              type="number"
              min="1"
              value={form.sets}
              onChange={(e) =>
                setForm({ ...form, sets: Number(e.target.value) })
              }
              required
            />
          </label>

          <label>
            Reps
            <input
              type="number"
              min="1"
              value={form.reps}
              onChange={(e) =>
                setForm({ ...form, reps: Number(e.target.value) })
              }
              required
            />
          </label>

          <label>
            Weight (opt.)
            <input
              value={form.weight}
              onChange={(e) => setForm({ ...form, weight: e.target.value })}
              placeholder="e.g., 135 lb"
            />
          </label>
        </div>

        <label>
          Day of Week
          <select
            value={form.day}
            onChange={(e) => setForm({ ...form, day: e.target.value })}
          >
            {dayOptions}
          </select>
        </label>

        <div className={styles.actions}>
          <button type="button" className={styles.cancelBtn} onClick={goBack}>
            Cancel
          </button>
          <button type="submit" disabled={!isValid}>
            Save Workout
          </button>
        </div>
      </form>
    </PageContent>
  );
}

export default WorkoutForm;
