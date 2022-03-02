import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Global/Header';
import './App.css'
import Register from './pages/register'
import Login from './pages/login'
import Home from './pages/home'
import { ToastContainer } from 'react-toastify';

function App() {
  


  return (
    <>
    <Router>
      <div className="flex justify-center flex-col align-center mx-auto p-6">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <h2>Check the obvious routes from the header below</h2>
        <Header />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </Router>
    <ToastContainer />
  </>
  )
}

export default App
