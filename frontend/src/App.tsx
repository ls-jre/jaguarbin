import { Toaster } from 'react-hot-toast';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Bin from './components/Bin';

function App() {
  return (
    <div>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/bin/:binId" element={<Bin />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
