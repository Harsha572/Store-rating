import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">
        Welcome to the Admin Dashboard
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Manage users, stores, and overall platform data here.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
        <Link
          to="/admin/users"
          className="block p-6 bg-white rounded-xl shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-2 text-blue-600">Manage Users</h2>
          <p className="text-gray-600">View and manage all registered users.</p>
        </Link>

        <Link
          to="/admin/stores"
          className="block p-6 bg-white rounded-xl shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-2 text-blue-600">Manage Stores</h2>
          <p className="text-gray-600">Oversee store data and activity.</p>
        </Link>

        <Link
          to="/admin/reports"
          className="block p-6 bg-white rounded-xl shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-2 text-blue-600">View Reports</h2>
          <p className="text-gray-600">Check platform statistics and reports.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
