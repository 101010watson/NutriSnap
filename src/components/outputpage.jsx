import React from "react";
import { useLocation } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const { imageSrc, nutritionData } = location.state || {};

  if (!imageSrc || !nutritionData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-red-500">No data to display.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Nutrition Analysis</h1>
        
        <div className="flex justify-center mb-6">
          <img
            src={imageSrc}
            alt="Uploaded Food"
            className="w-full max-w-md rounded-xl shadow-md object-cover"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-sm">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left">
                <th className="py-3 px-4 font-semibold text-lg">Nutrient</th>
                <th className="py-3 px-4 font-semibold text-lg">Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(nutritionData).map(([key, value], idx) => (
                <tr key={idx} className="border-t border-gray-300 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-700 capitalize">{key}</td>
                  <td className="py-3 px-4 text-gray-900 font-medium">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
