// src/pages/Nutrition.jsx
import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { mockFoods } from "../data/foodsData";
// const mockFoods = [
//   { name: "Apple", calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
//   { name: "Banana", calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
//   { name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
// ];

const Nutrition = () => {
  const [search, setSearch] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState(100);
  const [foods, setFoods] = useState([]);
  const [loggedFoods, setLoggedFoods] = useState([]);
  const [editId, setEditId] = useState(null);

  // Fetch logged foods from backend
  const fetchLoggedFoods = async () => {
    try {
      const res = await axiosInstance.get("/nutrition");
      setLoggedFoods(res.data);
    } catch (err) {
      console.error("Failed to fetch logged foods:", err);
    }
  };

  useEffect(() => {
    fetchLoggedFoods();
  }, []);

  useEffect(() => {
    if (search) {
      const filtered = mockFoods.filter((f) =>
        f.name.toLowerCase().includes(search.toLowerCase())
      );
      setFoods(filtered);
    } else setFoods([]);
  }, [search]);

  const handleAddOrUpdateFood = async () => {
    if (!selectedFood) return alert("Select a food item first");

    const calories = (selectedFood.calories * quantity) / 100;
    const protein = (selectedFood.protein * quantity) / 100;
    const carbs = (selectedFood.carbs * quantity) / 100;
    const fat = (selectedFood.fat * quantity) / 100;

    try {
      if (editId) {
        // Update existing food
        await axiosInstance.put(`/nutrition/${editId}`, {
          foodName: selectedFood.name,
          quantity,
          calories,
          protein,
          carbs,
          fat,
        });
        setEditId(null);
      } else {
        // Add new food
        await axiosInstance.post("/nutrition", {
          foodName: selectedFood.name,
          quantity,
          calories,
          protein,
          carbs,
          fat,
        });
      }

      fetchLoggedFoods();
      setSelectedFood(null);
      setSearch("");
      setQuantity(100);
    } catch (err) {
      console.error(err);
      alert("Failed to save food");
    }
  };

  const handleEdit = (food) => {
    setEditId(food._id);
    setSelectedFood(mockFoods.find((f) => f.name === food.foodName) || {
      name: food.foodName,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
    });
    setQuantity(food.quantity);
    setSearch(food.foodName);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/nutrition/${id}`);
      fetchLoggedFoods();
    } catch (err) {
      console.error(err);
      alert("Failed to delete food");
    }
  };

  return (
    <div className="p-4  mx-auto w-full px-10">
      <h1 className="text-xl font-bold mb-4">Nutrition Tracker</h1>

      <input
        type="text"
        placeholder="Search food..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      {foods.length > 0 && (
        <ul className="border mb-2 h-[200px] overflow-x-scroll">
          {foods.map((f, idx) => (
            <li
              key={idx}
              className={`p-2 cursor-pointer ${
                selectedFood?.name === f.name ? "bg-blue-200" : ""
              }`}
              onClick={() => setSelectedFood(f)}
            >
              {f.name} - {f.calories} cal/100g
            </li>
          ))}
        </ul>
      )}

      {selectedFood && (
        <div className="mb-4">
          <p>Selected: {selectedFood.name}</p>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border p-2 w-full mt-2"
          />
          <button
            onClick={handleAddOrUpdateFood}
            className="bg-blue-500 text-white px-4 py-2 mt-2"
          >
            {editId ? "Update Food" : "Add Food"}
          </button>
        </div>
      )}

      <h2 className="text-lg font-semibold mt-4 mb-4">Logged Foods</h2>
      <ul>
        {loggedFoods.map((food) => (
          <li
            key={food._id}
            className="flex flex-wrap justify-between items-center border p-2 mb-1 rounded"
          >
            <div className="md:w-auto w-full">
              {food.foodName} - {food.calories.toFixed(1)} cal ({food.quantity} g)
            </div>
            <div className="space-x-2 flex mt-3 md:mt-0">
              <button
                onClick={() => handleEdit(food)}
                className="bg-yellow-400 px-2 py-1 rounded w-auto"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(food._id)}
                className="bg-red-500 text-white px-2 py-1 rounded w-auto"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nutrition;
