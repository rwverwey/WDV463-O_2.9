import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Log from './pages/Log';
import AddEdit from './pages/AddEdit';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/log" element={<Log />} />
          <Route path="/entry/:id?" element={<AddEdit />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
