// src/pages/Fitness.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import axios from "axios";
const workoutTypes = [
  { label: "Running", value: "running" },
  { label: "Cycling", value: "cycling" },
  { label: "Strength", value: "strength" },
];

const calculateCalories = (type, duration) => {
  const caloriesPerMinute = {
    running: 10,
    cycling: 8,
    strength: 6,
  };
  return (caloriesPerMinute[type] || 5) * duration;
};

const Fitness = () => {
  const [workouts, setWorkouts] = useState([]);
  const [formData, setFormData] = useState({
    workoutType: "running",
    duration: "",
  });
  const [editId, setEditId] = useState(null);

  // Fetch workouts
  const fetchWorkouts = async () => {
    try {
      const res = await axiosInstance.get("/fitness");
      setWorkouts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { workoutType, duration } = formData;
    if (!duration) return alert("Enter duration in minutes");

    try {
      if (editId) {
        // Update workout
        await axiosInstance.put(`/fitness/${editId}`, { workoutType, duration });
        setEditId(null);
      } else {
        // Add workout
        await axiosInstance.post("/fitness", { workoutType, duration });
      }
      setFormData({ workoutType: "running", duration: "" });
      fetchWorkouts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (workout) => {
    setFormData({ workoutType: workout.workoutType, duration: workout.duration });
    setEditId(workout._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;
    try {
      await axiosInstance.delete(`/fitness/${id}`);
      fetchWorkouts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-full px-10 mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Fitness Tracker</h1>

      {/* Workout Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow p-4 rounded mb-6">
        <div className="flex flex-wrap gap-4 mb-4">
          <select
            name="workoutType"
            value={formData.workoutType}
            onChange={handleChange}
            className="border p-2 rounded flex-1"
          >
            {workoutTypes.map((w) => (
              <option key={w.value} value={w.value}>{w.label}</option>
            ))}
          </select>

          <input
            type="number"
            name="duration"
            placeholder="Duration (min)"
            value={formData.duration}
            onChange={handleChange}
            className="border p-2 rounded flex-1"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-3 w-full md:w-auto md:py-0 rounded hover:bg-blue-600"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>

        {formData.duration && (
          <p>Estimated Calories: {calculateCalories(formData.workoutType, formData.duration)} kcal</p>
        )}
      </form>

      {/* Workouts List */}
      <div className="space-y-4">
        {workouts.length === 0 && <p>No workouts logged yet.</p>}
        {workouts.map((workout) => (
          <div key={workout._id} className="flex justify-between items-center bg-white shadow p-4 rounded">
            <div>
              <p className="font-semibold">{workout.workoutType.charAt(0).toUpperCase() + workout.workoutType.slice(1)}</p>
              <p>Duration: {workout.duration} min | Calories: {workout.caloriesBurned} kcal</p>
              <p className="text-sm text-gray-500">{new Date(workout.date).toLocaleString()}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(workout)} className="text-blue-500 hover:underline">Edit</button>
              <button onClick={() => handleDelete(workout._id)} className="text-red-500 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fitness;
