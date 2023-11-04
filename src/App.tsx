
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/Auth/AuthProvider';
import AdminPage from './pages/AdminPage/AdminPage';
// import AddPlace from './pages/AdminPage/sections/AddPlace/AddPlace';
import SmartPage from './pages/SmartPage/SmartPage';
import Curriculum from './pages/CurriculumPage/Curriculum';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Login from './pages/LoginPage/Login';
import Register from './pages/RegisterPage/Register';
import { ProtectedRoutes } from './ProtectedRoutes';


export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/curriculum" element={<Curriculum />} />
          <Route element={<ProtectedRoutes />} >
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin/*" element={<AdminPage />}>
              {/* <Route path="add-place" element={<AddPlace />} /> */}
            </Route>
            <Route path="/smart/*" element={<SmartPage />}>
              {/* <Route path="add-place" element={<AddPlace />} /> */}
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}
