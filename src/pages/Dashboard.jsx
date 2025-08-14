// Dashboard.jsx
import { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import axiosInstance from "../api/axiosInstance";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axiosInstance.get("/progress");
        setProgress(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProgress();
  }, []);

  if (!progress) return <p>Loading...</p>;

  // Bar chart for calories
  const calorieData = {
    labels: ["Intake", "Burn", "Net"],
    datasets: [
      {
        label: "Calories",
        data: [
          progress.calories.intake,
          progress.calories.burn,
          progress.calories.net,
        ],
        backgroundColor: ["#4caf50", "#f44336", "#2196f3"],
      },
    ],
  };

  // Doughnut chart for nutrition macros
  const nutritionData = {
    labels: ["Protein", "Carbs", "Fat"],
    datasets: [
      {
        data: [
          progress.nutritionGoal.protein,
          progress.nutritionGoal.carbs,
          progress.nutritionGoal.fat,
        ],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56"],
      },
    ],
  };

  return (
    <div className="p-6 max-w-full px-10 mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Calories */}
      <div className="mb-8 bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-4">Calories</h2>
        <Bar
          data={calorieData}
          options={{
            responsive: true,
            plugins: { legend: { display: false } },
          }}
        />
      </div>

      {/* Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 align-center justify-center">
        <div className="">
          <div className="bg-white shadow rounded p-4 mb-5">
            <h3 className="font-semibold mb-2">Steps Goal</h3>
            <p>
              {progress.stepsGoal?.progress || 0} /{" "}
              {progress.stepsGoal?.target || 0}
            </p>
          </div>
          <div className="bg-white shadow rounded p-4 mb-5">
            <h3 className="font-semibold mb-2">Workout Goal</h3>
            <p>
              {progress.workoutGoal?.progress || 0} /{" "}
              {progress.workoutGoal?.target || 0}
            </p>
          </div>
          <div className="bg-white shadow rounded p-4 mb-5">
            <h3 className="font-semibold mb-2">Nutrition Goal (calories)</h3>
            <p>
              {progress.nutritionGoal?.progress || 0} /{" "}
              {progress.nutritionGoal?.calories || 0}
            </p>
          </div>
        </div>

        {/* Nutrition Macros */}
        <div className="bg-white shadow rounded p-4 lg:p-50">
          <h2 className="text-xl font-semibold mb-4">Macros</h2>
          <Doughnut
            data={nutritionData}
            options={{
              responsive: true,
              plugins: { legend: { position: "bottom" } },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
