import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [formData, setFormData] = useState({
    type: "steps",
    target: "",
    recurrence: "none",
    progress: "",
  });
  const [editGoalId, setEditGoalId] = useState(null);
  const [showProgressInput, setShowProgressInput] = useState(false);

  // Fetch all goals
  const fetchGoals = async () => {
    try {
      const res = await axiosInstance.get("/goals");
      setGoals(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editGoalId) {
        await axiosInstance.put(`/goals/${editGoalId}`, {
          ...formData,
          progress: formData.progress,
        });
        setEditGoalId(null);
        setShowProgressInput(false);
      } else {
        await axiosInstance.post("/goals", formData);
      }
      setFormData({
        type: "steps",
        target: "",
        recurrence: "none",
        progress: "",
      });
      fetchGoals();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (goal) => {
    setEditGoalId(goal._id);
    setFormData({
      type: goal.type,
      target: goal.target,
      recurrence: goal.recurrence || "none",
      progress: goal.progress || 0,
    });
    setShowProgressInput(true); // show progress input only on edit
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/goals/${id}`);
      fetchGoals();
    } catch (err) {
      console.error(err);
    }
  };
  const handleReset = () => {
    setFormData({
      type: "",
      target: " ",
      recurrence: "",
      progress: "",
    });
  };

  return (
    <div className="p-6 w-full px-10 mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Goals</h2>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="mb-6  p-4 rounded shadow"
      >
        <div className="mb-2">
          <label className="block font-medium">Goal Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="steps">Steps</option>
            <option value="calories">Calories</option>
            <option value="workout">Workout</option>
            <option value="nutrition">Nutrition</option>
          </select>
        </div>

        <div className="mb-2">
          <label className="block font-medium">Target:</label>
          <input
            type="number"
            name="target"
            value={formData.target}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div className="mb-2">
          <label className="block font-medium">Recurrence:</label>
          <select
            name="recurrence"
            value={formData.recurrence}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="none">One-time</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        {/* Progress input: hidden initially */}
        {showProgressInput && (
          <div className="mb-2">
            <label className="block font-medium">Progress:</label>
            <input
              type="number"
              name="progress"
              value={formData.progress}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          {editGoalId ? "Update Goal" : "Add Goal"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="bg-gray-500 text-white px-4 py-2 rounded ml-5"
        >
          Reset Form
        </button>
      </form>

      {/* Goals List */}
      <div>
        {goals.length === 0 ? (
          <p>No goals yet. Add one above!</p>
        ) : (
          <ul className="space-y-2">
            {goals.map((goal) => (
              <li
                key={goal._id}
                className="border p-3 rounded flex flex-wrap justify-between items-center"
              >
                <div>
                  <strong>{goal.type.toUpperCase()}</strong> - Target:{" "}
                  {goal.target}, Progress: {goal.progress || 0}, Recurrence:{" "}
                  {goal.recurrence}
                </div>
                <div className="space-x-2 mt-3 md:mt-0 flex ">
                  <button
                    onClick={() => handleEdit(goal)}
                    className="bg-yellow-400 px-2 py-1 rounded  w-auto"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(goal._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded w-auto"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Goals;
