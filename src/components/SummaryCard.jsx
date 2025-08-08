const SummaryCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex items-center space-x-4 w-full md:w-1/3">
      <div className="text-4xl text-green-500">{icon}</div>
      <div>
        <div className="text-gray-600 text-sm">{title}</div>
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </div>
  );
};

export default SummaryCard;
