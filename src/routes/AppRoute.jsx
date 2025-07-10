import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/mainPage';
import LoginPage from '../pages/loginPage';
import SecondaryPage from '../pages/secondaryPage';
import AddReviewPage from '../pages/AddReviewPage';
import CanteenPage from '../pages/CanteenPage';
import FinancePage from '../pages/FinancePage';
import HrdPage from '../pages/HRDPage';
import ItgPage from '../pages/ITGPage';
import SportsPage from '../pages/SportsPage';


import CardDetails from '../pages/CardDetails';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Login is the default route */}
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Redirect target after login */}
      <Route path="/main" element={<MainPage />} />
      
      <Route path="/dashboard" element={<SecondaryPage />} />
      <Route path="/review" element={<AddReviewPage />} />
      <Route path="/canteenPage" element={<CanteenPage/>} />
      <Route path="/financePage" element={<FinancePage />} />
      <Route path="/hrdPage" element={<HrdPage/>} />
      <Route path="/itgPage" element={<ItgPage/>} />
      <Route path="/SportsPage" element={<SportsPage />} />
      
      <Route path="/cards/:id" element={<CardDetails />} />
      
    </Routes>
  );
};

export default AppRoutes;
