import squatImg from "../assets/squat.jpg";
import benchPressImg from "../assets/bench-press.jpg";
import bicepCurlImg from "../assets/bicep-curl.jpg";
import preacherCurlImg from "../assets/preacher-curl.jpg";
import situpsImg from "../assets/situps.jpg";
import crunchesImg from "../assets/crunches.jpg";
import rowsImg from "../assets/rows.jpg";
import pullupsImg from "../assets/pull-ups.jpg";
import tricepExtImg from "../assets/tricep-extensions.jpg";
import lateralRaisesImg from "../assets/lateral-raises.jpg";
import hamstringCurlImg from "../assets/hamstring-curl.jpg";
import calfExtImg from "../assets/calf-extension.jpg";
import quadExtImg from "../assets/quad-extension.jpg";
import deadliftImg from "../assets/deadlift.jpg";

export const WORKOUT_CATALOG = [
  {
    key: "squat",
    name: "Back Squat",
    image: squatImg,
    defaults: { sets: 5, reps: 5, weight: "" },
    muscleGroup: "Legs",
    equipment: "Barbell",
  },
  {
    key: "bench_press",
    name: "Barbell Bench Press",
    image: benchPressImg,
    defaults: { sets: 3, reps: 8, weight: "" },
    muscleGroup: "Chest",
    equipment: "Barbell",
  },
  {
    key: "bicep_curl",
    name: "Bicep Curl",
    image: bicepCurlImg,
    defaults: { sets: 3, reps: 12, weight: "" },
    muscleGroup: "Biceps",
    equipment: "Dumbbells/Barbell",
  },
  {
    key: "preacher_curl",
    name: "Preacher Curl",
    image: preacherCurlImg,
    defaults: { sets: 3, reps: 10, weight: "" },
    muscleGroup: "Biceps",
    equipment: "EZ Bar/Preacher Bench",
  },
  {
    key: "situps",
    name: "Sit-Ups",
    image: situpsImg,
    defaults: { sets: 3, reps: 20, weight: "" },
    muscleGroup: "Core",
    equipment: "Bodyweight",
  },
  {
    key: "crunches",
    name: "Crunches",
    image: crunchesImg,
    defaults: { sets: 3, reps: 20, weight: "" },
    muscleGroup: "Core",
    equipment: "Bodyweight",
  },
  {
    key: "rows",
    name: "Rows",
    image: rowsImg,
    defaults: { sets: 4, reps: 8, weight: "" },
    muscleGroup: "Back",
    equipment: "Barbell/Dumbbells/Cable",
  },
  {
    key: "pull_ups",
    name: "Pull-Ups",
    image: pullupsImg,
    defaults: { sets: 3, reps: 8, weight: "" },
    muscleGroup: "Back",
    equipment: "Pull-Up Bar",
  },
  {
    key: "tricep_extensions",
    name: "Tricep Extensions",
    image: tricepExtImg,
    defaults: { sets: 3, reps: 12, weight: "" },
    muscleGroup: "Triceps",
    equipment: "Cable/Dumbbell/EZ Bar",
  },
  {
    key: "lateral_raises",
    name: "Lateral Raises",
    image: lateralRaisesImg,
    defaults: { sets: 3, reps: 12, weight: "" },
    muscleGroup: "Shoulders",
    equipment: "Dumbbells",
  },
  {
    key: "hamstring_curl",
    name: "Hamstring Curl",
    image: hamstringCurlImg,
    defaults: { sets: 3, reps: 12, weight: "" },
    muscleGroup: "Hamstrings",
    equipment: "Machine",
  },
  {
    key: "calf_extension",
    name: "Calf Extension",
    image: calfExtImg,
    defaults: { sets: 4, reps: 15, weight: "" },
    muscleGroup: "Calves",
    equipment: "Machine/Smith/Dumbbells",
  },
  {
    key: "quad_extension",
    name: "Quad Extension",
    image: quadExtImg,
    defaults: { sets: 3, reps: 12, weight: "" },
    muscleGroup: "Quads",
    equipment: "Machine",
  },
  {
    key: "deadlift",
    name: "Deadlift",
    image: deadliftImg,
    defaults: { sets: 3, reps: 5, weight: "" },
    muscleGroup: "Posterior Chain",
    equipment: "Barbell",
  },
];

export const CATALOG_BY_KEY = WORKOUT_CATALOG.reduce((acc, w) => {
  acc[w.key] = w;
  return acc;
}, {});
