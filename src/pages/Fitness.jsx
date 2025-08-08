import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const Fitness = () => {
  const [exercises, setExercises] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    duration: '',
    distance: '',
    calories: '',
  });
  const [editId, setEditId] = useState(null);

  // Fetch Exercises
  const fetchExercises = async () => {
    try {
      const response = await axiosInstance.get('/fitness');
      setExercises(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  // Handle Form Submit (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axiosInstance.put(`/fitness/${editId}`, formData);
        setEditId(null);
      } else {
        await axiosInstance.post('/fitness', formData);
      }
      setFormData({ type: '', duration: '', distance: '', calories: '' });
      fetchExercises();
    } catch (err) {
      console.log(err);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this exercise?')) {
      try {
        await axiosInstance.delete(`/fitness/${id}`);
        fetchExercises();
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Handle Edit Click
  const handleEdit = (exercise) => {
    setFormData({
      type: exercise.type,
      duration: exercise.duration,
      distance: exercise.distance,
      calories: exercise.calories,
    });
    setEditId(exercise._id);
  };

  // Reset Form Handler
  const handleReset = () => {
    setFormData({ type: '', duration: '', distance: '', calories: '' });
    setEditId(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Fitness Tracking</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Type (Running, Cycling)"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Duration (minutes)"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Distance (km)"
          value={formData.distance}
          onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="number"
          placeholder="Calories Burned"
          value={formData.calories}
          onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
          className="w-full border px-4 py-2 rounded"
        />
        <div className="flex space-x-2">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            {editId ? 'Update Exercise' : 'Add Exercise'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Reset
          </button>
        </div>
      </form>

      <h2 className="text-2xl font-semibold mb-4">Your Exercises</h2>
      <div className="space-y-4">
        {exercises.map((exercise) => (
          <div key={exercise._id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <p><strong>Type:</strong> {exercise.type}</p>
              <p><strong>Duration:</strong> {exercise.duration} min</p>
              <p><strong>Distance:</strong> {exercise.distance} km</p>
              <p><strong>Calories:</strong> {exercise.calories} kcal</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(exercise)}
                className="bg-yellow-400 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(exercise._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fitness;
