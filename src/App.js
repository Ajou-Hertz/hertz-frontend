import './App.css';
import { BrowserRouter as Router, Routes, Route } from'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Sign from './pages/Sign';
import Profile from './pages/Profile';
import Enroll from './pages/Enroll';
import Header from './components/Header';
import Footer from './components/Footer';
import InstrumentList from './pages/SubPage/InstrumentList';
import EnsembleRoom from './pages/SubPage/EnsembleRoon';
import ConcertHall from './pages/SubPage/ConcertHall';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Profile />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/enroll" element={<Enroll />} />
        <Route path="/InstrumentList" element={<InstrumentList />} />
        <Route path="/EnsembleRoom" element={<EnsembleRoom />} />
        <Route path="/ConcertHall" element={<ConcertHall />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
