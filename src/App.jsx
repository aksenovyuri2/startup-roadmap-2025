import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { GameProvider } from './context/GameContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import HowToUsePage from './pages/HowToUsePage';
import PrinciplesPage from './pages/PrinciplesPage';
import RussianSpecificsPage from './pages/RussianSpecificsPage';
import WeekPage from './pages/WeekPage';
import GateCheckPage from './pages/GateCheckPage';
import BudgetPage from './pages/BudgetPage';
import FunnelPage from './pages/FunnelPage';
import OverviewPage from './pages/OverviewPage';
import SummaryPage from './pages/SummaryPage';

export default function App() {
  return (
    <AuthProvider>
      <GameProvider>
      <BrowserRouter>
        <ProtectedRoute>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="how-to-use" element={<HowToUsePage />} />
              <Route path="principles" element={<PrinciplesPage />} />
              <Route path="russian-specifics" element={<RussianSpecificsPage />} />
              <Route path="week/:weekId" element={<WeekPage />} />
              <Route path="gate/:gateId" element={<GateCheckPage />} />
              <Route path="budget" element={<BudgetPage />} />
              <Route path="funnel" element={<FunnelPage />} />
              <Route path="overview" element={<OverviewPage />} />
              <Route path="summary" element={<SummaryPage />} />
            </Route>
          </Routes>
        </ProtectedRoute>
      </BrowserRouter>
      </GameProvider>
    </AuthProvider>
  );
}
