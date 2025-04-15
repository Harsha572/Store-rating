import { Link } from 'react-router-dom';

const StoreOwnerDashboard = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Welcome to the Store Owner Dashboard</h2>
      <p>Manage your store profile and view user ratings here.</p>

      <div className="mt-6">
        <Link to="/dashboard/store/list" className="text-blue-500 underline">
          View My Stores
        </Link>
      </div>
    </div>
  );
};

export default StoreOwnerDashboard;
