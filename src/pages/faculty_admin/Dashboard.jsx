import React from "react";
import DashboardCard from "../../components/common/DashboardCard";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Search bar */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Find a student"
            className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
            Search
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <p className="font-semibold text-gray-800">Mr. Alex Ben</p>
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-lg">👤</span>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Students" value="4072" />
        <DashboardCard title="Total Staff" value="15" />
        <DashboardCard title="Departments" value="6" />
        <DashboardCard title="Approved" value="4681" />
        <DashboardCard title="Pending" value="1791" />

        {/* Action cards */}
        <DashboardCard title="Add New Dept. Clearance" isAction />
        <DashboardCard title="Add New Clearance Type" isAction />
        <DashboardCard title="Add New Staff" isAction />
      </div>
    </div>
  );
};

export default Dashboard;
