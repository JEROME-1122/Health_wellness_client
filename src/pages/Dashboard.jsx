import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [profile, setProfile] = useState({});
  const [progress, setProgress] = useState({ steps: 0, calories: 0, workouts: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await axiosInstance.get('/profile');
        const progressRes = await axiosInstance.get('/progress');
        setProfile(profileRes.data);
        setProgress(progressRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const barData = {
    labels: ['Steps Goal', 'Calories Burned', 'Workouts'],
    datasets: [
      {
        label: 'Progress Overview',
        data: [progress.steps, progress.calories, progress.workouts],
        backgroundColor: ['#34D399', '#60A5FA', '#FBBF24'],
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Weekly Progress' },
    },
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, {profile.name || 'User'} 👋</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-100 p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold">Workouts</h2>
          <p className="text-3xl font-bold">{progress.workouts}</p>
        </div>
        <div className="bg-blue-100 p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold">Calories Burned</h2>
          <p className="text-3xl font-bold">{progress.calories} kcal</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg text-center">
          <h2 className="text-xl font-semibold">Steps Goal</h2>
          <p className="text-3xl font-bold">{progress.steps}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <Bar data={barData} options={barOptions} />
      </div>
    </div>
  );
};

export default Dashboard;
