// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home'; 
import Log from './pages/Log';
import AddEdit from './pages/AddEdit';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import { useAuth } from './context/useAuth';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function RedirectIfLoggedIn({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/log" replace /> : children;
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/log" />} />
          <Route path="/login" element={<RedirectIfLoggedIn><Login /></RedirectIfLoggedIn>} />
          <Route path="/register" element={<RedirectIfLoggedIn><Register /></RedirectIfLoggedIn>} />
          <Route path="/log" element={<ProtectedRoute><Log /></ProtectedRoute>} />
          <Route path="/entry/:id?" element={<ProtectedRoute><AddEdit /></ProtectedRoute>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
