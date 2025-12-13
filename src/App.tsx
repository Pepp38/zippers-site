import { Navigate, Route, Routes } from 'react-router-dom';
import { SaviorLanding } from './app/routes/savior/SaviorLanding';

export default function App() {
  return (
    <Routes>
      {/* Today: / is Savior */}
      <Route path="/" element={<SaviorLanding />} />

      {/* Future-proof: same page accessible at /savior */}
      <Route path="/savior" element={<SaviorLanding />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
