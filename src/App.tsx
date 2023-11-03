
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/Auth/AuthProvider';
import AdminPage from './pages/AdminPage/AdminPage';
import AddPlace from './pages/AdminPage/sections/AddPlace/AddPlace';
import RemovePlace from './pages/AdminPage/sections/RemovePlace/RemovePlace';
import UpdatePlace from './pages/AdminPage/sections/UpdatePlace/UpdatePlace';
import UserSanction from './pages/AdminPage/sections/UserSanction/UserSanction';
import Home from './pages/HomePage/Home';
import PlansPage from './pages/PlansPage/PlansPage';
import PlacePage from './pages/PlacePage/PlacePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Login from './pages/LoginPage/Login';
import Register from './pages/RegisterPage/Register';
import { ProtectedRoutes } from './ProtectedRoutes';
import { PlansProvider } from './context/Plans/PlansProvider';
import { PlaceProvider } from './context/Place/PlaceProvider';


export default function App() {
  return (
    <Router>
      <AuthProvider>
        <PlansProvider>
          <PlaceProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/tourist-guide" element={<Navigate to="/home" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/home" element={<Home/>} />
              <Route element={<ProtectedRoutes />} >
                <Route path="/plans" element={<PlansPage/>}/>
                <Route path="/place/:id" element={<PlacePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/admin/*" element={<AdminPage />}>
                  <Route path="add-place" element={<AddPlace />} />
                  <Route path="update-place" element={<UpdatePlace />} />
                  <Route path="remove-place" element={<RemovePlace />} />
                  <Route path="user-sanction" element={<UserSanction />} />
                </Route>
              </Route>
            </Routes>
          </PlaceProvider>
        </PlansProvider>
      </AuthProvider>
    </Router>
  )
}
