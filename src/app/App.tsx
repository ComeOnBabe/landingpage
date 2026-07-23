import { BrowserRouter, Routes, Route } from 'react-router';
import { Navigation } from './components/Navigation';
import { Landing } from './pages/Landing';
import { Community } from './pages/Community';
import { PreRegister } from './pages/PreRegister';

export default function App() {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#F8F9FA]">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/community" element={<Community />} />
          <Route path="/pre-register" element={<PreRegister />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}