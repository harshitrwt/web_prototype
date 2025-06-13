import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/mainPage';
import LoginPage from '../pages/loginPage';
import SecondaryPage from '../pages/secondaryPage';
import AddReviewPage from '../pages/AddReviewPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<SecondaryPage />} />
      <Route path="/review" element={<AddReviewPage />} />
    </Routes>
  );
};

export default AppRoutes;
