import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import UserLogin from './components/login/UserLogin';
import AdminLogin from './components/login/AdminLogin';
import StoreOwnerLogin from './components/login/StoreOwnerLogin';
import UserRegister from './components/register/UserRegister';
import AdminRegister from './components/register/AdminRegister';
import StoreOwnerRegister from './components/register/StoreOwnerRegister';
import UserDashboard from './components/dashboard/UserDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import StoreOwnerDashboard from './components/dashboard/StoreOwnerDashboard';

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login/user" element={<UserLogin />} />
    <Route path="/login/admin" element={<AdminLogin />} />
    <Route path="/login/store" element={<StoreOwnerLogin />} />
    <Route path="/register/user" element={<UserRegister />} />
    <Route path="/register/admin" element={<AdminRegister />} />
    <Route path="/register/store" element={<StoreOwnerRegister />} />
    <Route path="/user/dashboard" element={<UserDashboard />} />
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
    <Route path="/store/dashboard" element={<StoreOwnerDashboard />} />
  </Routes>
);

export default App;
