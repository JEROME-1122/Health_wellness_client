import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const Nutrition = () => {
  const [nutritions, setNutritions] = useState([]);
  const [formData, setFormData] = useState({
    food: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
  });
  const [editId, setEditId] = useState(null);

  // Fetch Nutritions
  const fetchNutritions = async () => {
    try {
      const response = await axiosInstance.get('/nutrition');
      setNutritions(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNutritions();
  }, []);

  // Handle Form Submit (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axiosInstance.put(`/nutrition/${editId}`, formData);
        setEditId(null);
      } else {
        await axiosInstance.post('/nutrition', formData);
      }
      setFormData({ food: '', calories: '', protein: '', carbs: '', fat: '' });
      fetchNutritions();
    } catch (err) {
      console.log(err);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this nutrition?')) {
      try {
        await axiosInstance.delete(`/nutrition/${id}`);
        fetchNutritions();
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Handle Edit Click
  const handleEdit = (nutrition) => {
    setFormData({
      food: nutrition.food,
      calories: nutrition.calories,
      protein: nutrition.protein,
      carbs: nutrition.carbs,
      fat: nutrition.fat,
    });
    setEditId(nutrition._id);
  };

  // Handle Form Reset
  const handleReset = () => {
    setFormData({ food: '', calories: '', protein: '', carbs: '', fat: '' });
    setEditId(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Nutrition Tracking</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Food Name"
          value={formData.food}
          onChange={(e) => setFormData({ ...formData, food: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Calories"
          value={formData.calories}
          onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Protein (g)"
          value={formData.protein}
          onChange={(e) => setFormData({ ...formData, protein: e.target.value })}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="number"
          placeholder="Carbs (g)"
          value={formData.carbs}
          onChange={(e) => setFormData({ ...formData, carbs: e.target.value })}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="number"
          placeholder="Fat (g)"
          value={formData.fat}
          onChange={(e) => setFormData({ ...formData, fat: e.target.value })}
          className="w-full border px-4 py-2 rounded"
        />
        <div className="flex space-x-4">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            {editId ? 'Update' : 'Add'}
          </button>
      
            <button type="button" onClick={handleReset} className="bg-gray-400 text-white px-4 py-2 rounded">
           Reset
            </button>
       
        </div>
      </form>

      <h2 className="text-2xl font-semibold mb-4">Your Nutrition Logs</h2>
      <div className="space-y-4">
        {nutritions.map((nutrition) => (
          <div key={nutrition._id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <p><strong>Food:</strong> {nutrition.food}</p>
              <p><strong>Calories:</strong> {nutrition.calories} kcal</p>
              <p><strong>Protein:</strong> {nutrition.protein} g</p>
              <p><strong>Carbs:</strong> {nutrition.carbs} g</p>
              <p><strong>Fat:</strong> {nutrition.fat} g</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(nutrition)} className="bg-yellow-400 text-white px-3 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(nutrition._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nutrition;
