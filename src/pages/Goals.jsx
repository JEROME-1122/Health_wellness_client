import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [formData, setFormData] = useState({
    title: 'Steps',
    totalSteps: '',
    stepsCompleted: '',
  });
  const [editId, setEditId] = useState(null);

  // Fetch Goals
  const fetchGoals = async () => {
    try {
      const response = await axiosInstance.get('/goals');
      setGoals(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

    const handleReset = () => {
    setFormData({ title: '', totalSteps: '', stepsCompleted: '' });
    setEditId(null);
  };


  // Handle Form Submit (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axiosInstance.put(`/goals/${editId}`, formData);
        setEditId(null);
      } else {
        await axiosInstance.post('/goals', formData);
      }
      setFormData({ title: '', totalSteps: '', stepsCompleted: '' });
      fetchGoals();
    } catch (err) {
      console.log(err);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        await axiosInstance.delete(`/goals/${id}`);
        fetchGoals();
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Handle Edit Click
  const handleEdit = (goal) => {
    setFormData({
      title: goal.title,
      totalSteps: goal.totalSteps,
      stepsCompleted: goal.stepsCompleted,
    });
    setEditId(goal._id);
  };

  // Calculate Progress Percentage
  const calculateProgress = (current, target) => {
    if (!target || target === 0) return 0;
    return Math.min(Math.round((current / target) * 100), 100);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Goal Tracking</h1>

      {/* Goal Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Goal Name"
          value={formData.title}
          readOnly
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Target Value"
          value={formData.totalSteps}
          onChange={(e) => setFormData({ ...formData, totalSteps: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Current Progress"
          value={formData.stepsCompleted}
          onChange={(e) => setFormData({ ...formData, stepsCompleted: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {editId ? 'Update Goal' : 'Add Goal'}
        </button>
        <button
            type="button"
            onClick={handleReset}
            className="bg-gray-500 text-white px-4 py-2 rounded ml-5"
          >
            Reset
          </button>
      </form>

      {/* Goal List */}
      <h2 className="text-2xl font-semibold mb-4">Your Goals</h2>
      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal._id} className="border p-4 rounded">
            <div className="flex justify-between items-center mb-2">
              <div>
                <p><strong>Goal:</strong> {goal.title}</p>
                <p><strong>Target:</strong> {goal.totalSteps}</p>
                <p><strong>Current:</strong> {goal.stepsCompleted}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(goal)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(goal._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{
                  width: `${calculateProgress(goal.stepsCompleted, goal.totalSteps)}%`,
                }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {calculateProgress(goal.stepsCompleted, goal.totalSteps)}% completed
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Goals;

