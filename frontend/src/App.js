import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Myprofile from './Myprofile';
import LoginError from './LoginError';
import Allusers from './Allusers';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myprofile" element={<Myprofile />} />
          <Route path="/loginerror" element={<LoginError />} />
          <Route path="/allusers" element={<Allusers />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
