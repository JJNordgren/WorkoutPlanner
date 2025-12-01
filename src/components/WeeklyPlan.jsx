import { useEffect, useMemo, useState } from "react";
import { db, ref, get, child, update, push, remove } from "../firebase";
import { onValue } from "firebase/database";
import { useAuth } from "../auth/AuthContext";
import { DAY_KEYS, getWeekKey, weekRangeLabel } from "../utils/date";
import styles from "./WeeklyPlan.module.css";
import { Link, useNavigate } from "react-router-dom";

function Timeline({
  days,
  itemsByDay,
  dayStatus,
  navigate,
  markCompleted,
  deleteItem,
  completeDay,
}) {
  return (
    <div className={styles.timeline}>
      {days.map((day, idx) => {
        const items = itemsByDay?.[day] || [];
        const allDone = items.length > 0 && items.every((it) => it.completed);
        const dayDone = !!dayStatus?.[day] && allDone;

        return (
          <section key={day} className={styles.node}>
            <div className={styles.rail}>
              <span
                className={`${styles.dot} ${
                  dayDone ? styles.dotDone : styles.dotIdle
                }`}
                aria-hidden
              />
              {idx !== days.length - 1 && <span className={styles.line} />}
            </div>

            <div className={styles.content}>
              <div className={styles.dayHeader}>
                <h3 className={styles.dayTitle}>{day}</h3>
                <button
                  className={styles.addBtn}
                  onClick={() => navigate(`/workouts/new?day=${day}`)}
                  title={`Add workout to ${day}`}
                >
                  + Add
                </button>
              </div>

              {items.length === 0 ? (
                <p className={styles.empty}>No workouts</p>
              ) : (
                <>
                  <ul className={styles.cardList}>
                    {items.map((it) => (
                      <li key={it.id} className={styles.card}>
                        <div className={styles.cardTop}>
                          <Link
                            to={`/workouts/${it.workoutId || "custom"}`}
                            className={styles.name}
                          >
                            {it.name}
                          </Link>
                          <span className={styles.meta}>
                            {it.sets}×{it.reps}
                            {it.weight ? ` @ ${it.weight}` : ""}
                          </span>
                        </div>

                        <div className={styles.cardActions}>
                          {it.completed ? (
                            <span className={styles.badge}>Completed</span>
                          ) : (
                            <button
                              className={styles.doneBtn}
                              onClick={() => markCompleted(day, it.id, it)}
                            >
                              Mark Completed
                            </button>
                          )}
                          <button
                            className={styles.deleteBtn}
                            onClick={() => deleteItem(day, it.id)}
                            title="Remove from this day"
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className={styles.dayFooter}>
                    <button
                      className={styles.completeDayBtn}
                      disabled={!allDone || dayDone}
                      onClick={() => completeDay(day)}
                    >
                      {dayDone ? "Workout Completed ✓" : "Complete Workout"}
                    </button>
                    {!allDone && (
                      <p className={styles.helper}>
                        Finish all items above to enable this button.
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function MiniCalendar({
  days,
  itemsByDay,
  dayStatus,
  navigate,
  markCompleted,
  deleteItem,
  completeDay,
}) {
  return (
    <div className={styles.calendar}>
      <div className={styles.calHeader}>
        {days.map((d) => (
          <div key={d} className={styles.calHeadCell}>
            {d}
          </div>
        ))}
      </div>

      <div className={styles.calGrid}>
        {days.map((day) => {
          const items = itemsByDay?.[day] || [];
          const allDone = items.length > 0 && items.every((it) => it.completed);
          const dayDone = !!dayStatus?.[day] && allDone;

          return (
            <div key={day} className={styles.calCell}>
              <div className={styles.calCellHead}>
                <span
                  className={`${styles.calDot} ${
                    dayDone ? styles.calDotDone : styles.calDotIdle
                  }`}
                />
                <span className={styles.calTitle}>{day}</span>
                <button
                  className={styles.calAddBtn}
                  onClick={() => navigate(`/workouts/new?day=${day}`)}
                  title={`Add workout to ${day}`}
                >
                  +
                </button>
              </div>

              {items.length === 0 ? (
                <p className={styles.calEmpty}>No workouts</p>
              ) : (
                <>
                  <ul className={styles.calItems}>
                    {items.map((it) => (
                      <li key={it.id} className={styles.calItemCard}>
                        <div className={styles.calItemTop}>
                          <Link
                            to={`/workouts/${it.workoutId || "custom"}`}
                            className={styles.name}
                          >
                            {it.name}
                          </Link>
                          <span className={styles.meta}>
                            {it.sets}×{it.reps}
                          </span>
                        </div>
                        <div className={styles.cardActions}>
                          {it.completed ? (
                            <span className={styles.badge}>✓</span>
                          ) : (
                            <button
                              className={styles.doneBtn}
                              onClick={() => markCompleted(day, it.id, it)}
                              title="Mark item completed"
                            >
                              Done
                            </button>
                          )}
                          <button
                            className={styles.deleteBtn}
                            onClick={() => deleteItem(day, it.id)}
                            title="Remove"
                          >
                            ✕
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className={styles.calFooter}>
                    <button
                      className={styles.completeDayBtn}
                      disabled={!allDone || dayDone}
                      onClick={() => completeDay(day)}
                    >
                      {dayDone ? "Completed ✓" : "Complete Day"}
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WeeklyPlan() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [weekKey] = useState(getWeekKey());
  const [itemsByDay, setItemsByDay] = useState({});
  const [dayStatus, setDayStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ sessionsTotal: 0, sessionsWeek: 0 });
  const [view, setView] = useState("timeline");

  const days = useMemo(() => DAY_KEYS, []);

  useEffect(() => {
    if (!user) return;

    const planRef = ref(db, `plans/${user.uid}/weeks/${weekKey}`);
    const unsubPlan = onValue(planRef, (snap) => {
      const raw = snap.exists() ? snap.val() : {};

      const normalized = {};
      days.forEach((d) => {
        const bucket = raw?.[d] || {};
        normalized[d] = Object.entries(bucket).map(([id, v]) => ({
          id,
          ...v,
        }));
      });
      setItemsByDay(normalized);

      const status = raw?.status || {};
      setDayStatus(status);

      setLoading(false);
    });

    const totRef = ref(db, `stats/${user.uid}/sessionsTotal`);
    const unsubTot = onValue(totRef, (s) =>
      setStats((prev) => ({
        ...prev,
        sessionsTotal: s.exists() ? s.val() : 0,
      }))
    );

    const wkRef = ref(db, `stats/${user.uid}/sessions/weeks/${weekKey}`);
    const unsubWeek = onValue(wkRef, (s) =>
      setStats((prev) => ({
        ...prev,
        sessionsWeek: s.exists()
          ? typeof s.val() === "number"
            ? s.val()
            : s.val().count ?? 0
          : 0,
      }))
    );

    return () => {
      unsubPlan();
      unsubTot();
      unsubWeek();
    };
  }, [user, weekKey, days]);

  async function markCompleted(day, id, item) {
    if (!user) return;

    setItemsByDay((prev) => ({
      ...prev,
      [day]: (prev[day] || []).map((x) =>
        x.id === id ? { ...x, completed: true, completedAt: Date.now() } : x
      ),
    }));

    await update(ref(db, `plans/${user.uid}/weeks/${weekKey}/${day}/${id}`), {
      completed: true,
      completedAt: Date.now(),
    });

    await push(ref(db, `logs/${user.uid}`), {
      type: "itemComplete",
      weekKey,
      day,
      workoutId: item.workoutId || null,
      name: item.name,
      sets: item.sets,
      reps: item.reps,
      createdAt: item.createdAt,
      completedAt: Date.now(),
    });
  }

  async function deleteItem(day, id) {
    if (!user) return;

    setItemsByDay((prev) => {
      const next = {
        ...prev,
        [day]: (prev[day] || []).filter((x) => x.id !== id),
      };
      return next;
    });

    await remove(ref(db, `plans/${user.uid}/weeks/${weekKey}/${day}/${id}`));

    const remaining = (itemsByDay[day] || []).filter((x) => x.id !== id);
    if ((dayStatus?.[day] || false) && remaining.length === 0) {
      setDayStatus((s) => ({ ...s, [day]: false }));
      await update(ref(db, `plans/${user.uid}/weeks/${weekKey}/status`), {
        [day]: false,
      });
    }
  }

  async function completeDay(day) {
    if (!user) return;

    const items = itemsByDay?.[day] || [];
    const allDone = items.length > 0 && items.every((it) => it.completed);
    if (!allDone) return;

    setDayStatus((s) => ({ ...s, [day]: true }));

    const countedRef = ref(
      db,
      `stats/${user.uid}/sessions/weeks/${weekKey}/days/${day}`
    );
    const countedSnap = await get(countedRef);
    const alreadyCounted = countedSnap.exists() && countedSnap.val() === true;

    if (alreadyCounted) {
      await update(ref(db, `plans/${user.uid}/weeks/${weekKey}/status`), {
        [day]: true,
      });

      await push(ref(db, `logs/${user.uid}`), {
        type: "dayCompleteRepeat",
        weekKey,
        day,
        itemCount: items.length,
        completedAt: Date.now(),
      });
      return;
    }

    const nextTotal = (stats.sessionsTotal || 0) + 1;
    const nextWeek = (stats.sessionsWeek || 0) + 1;

    await update(ref(db), {
      [`plans/${user.uid}/weeks/${weekKey}/status/${day}`]: true,

      [`stats/${user.uid}/sessionsTotal`]: nextTotal,
      [`stats/${user.uid}/sessions/weeks/${weekKey}/count`]: nextWeek,

      [`stats/${user.uid}/sessions/weeks/${weekKey}/days/${day}`]: true,
    });

    await push(ref(db, `logs/${user.uid}`), {
      type: "dayComplete",
      weekKey,
      day,
      itemCount: items.length,
      completedAt: Date.now(),
    });
  }

  if (loading) return <p>Loading weekly plan…</p>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>This Week</h2>
        <span className={styles.range}>{weekRangeLabel()}</span>

        <div className={styles.headRight}>
          <div className={styles.stats}>
            <span>
              Sessions (All Time): <b>{stats.sessionsTotal}</b>
            </span>
            <span>
              This Week: <b>{stats.sessionsWeek}</b>
            </span>
          </div>

          <div className={styles.viewToggle} role="tablist" aria-label="View">
            <button
              role="tab"
              aria-selected={view === "timeline"}
              className={`${styles.toggleBtn} ${
                view === "timeline" ? styles.toggleActive : ""
              }`}
              onClick={() => setView("timeline")}
            >
              Timeline
            </button>
            <button
              role="tab"
              aria-selected={view === "calendar"}
              className={`${styles.toggleBtn} ${
                view === "calendar" ? styles.toggleActive : ""
              }`}
              onClick={() => setView("calendar")}
            >
              Calendar
            </button>
          </div>
        </div>
      </div>

      {view === "timeline" ? (
        <Timeline
          days={days}
          itemsByDay={itemsByDay}
          dayStatus={dayStatus}
          navigate={navigate}
          markCompleted={markCompleted}
          deleteItem={deleteItem}
          completeDay={completeDay}
        />
      ) : (
        <MiniCalendar
          days={days}
          itemsByDay={itemsByDay}
          dayStatus={dayStatus}
          navigate={navigate}
          markCompleted={markCompleted}
          deleteItem={deleteItem}
          completeDay={completeDay}
        />
      )}
    </div>
  );
}

export default WeeklyPlan;
