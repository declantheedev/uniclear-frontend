import React from "react";

const DashboardCard = ({ title, value, onClick, isAction }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer flex flex-col items-center justify-center bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition ${
        isAction ? "text-gray-700" : ""
      }`}
    >
      {isAction ? (
        <>
          <span className="text-3xl font-bold mb-2">+</span>
          <p className="font-semibold text-center">{title}</p>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold">{value}</h2>
          <p className="text-gray-500 text-sm mt-1">{title}</p>
        </>
      )}
    </div>
  );
};

export default DashboardCard;
