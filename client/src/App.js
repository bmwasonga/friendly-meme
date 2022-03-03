import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Global/Header';
import './App.css';
import Register from './pages/register';
import Login from './pages/login';
import Home from './pages/home';

function App() {
  return (
    <>
      <Router>
        <div className="flex justify-center flex-col align-center mx-auto p-4 shadow-lg">
          <Header />
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
