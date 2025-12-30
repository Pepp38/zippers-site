import { Navigate, Route, Routes } from 'react-router-dom';
import { SaviorLanding } from './app/routes/savior/SaviorLanding';
import { PremiumIndex } from './app/routes/savior/premium/PremiumIndex';
import { SafeStateRecoveryPage } from './app/routes/savior/premium/SafeStateRecoveryPage';
import { BuyPage } from './app/routes/buy/BuyPage';
import { BuySuccessPage } from './app/routes/buy/BuySuccessPage';
import { BuyCancelPage } from './app/routes/buy/BuyCancelPage';
import { BlogIndex } from './pages/blog/BlogIndex';
import { BlogPost } from './pages/blog/BlogPost';

export default function App() {
  return (
    <Routes>
      {/* Today: / is Savior */}
      <Route path="/" element={<SaviorLanding />} />

      {/* Future-proof: same page accessible at /savior */}
      <Route path="/savior" element={<SaviorLanding />} />

      {/* Premium */}
      <Route path="/savior/premium" element={<PremiumIndex />} />
      <Route
        path="/savior/premium/safestate-recovery"
        element={<SafeStateRecoveryPage />}
      />

      {/* Buy flow (UI only) */}
      <Route path="/buy/:sku" element={<BuyPage />} />
      <Route path="/buy/:sku/success" element={<BuySuccessPage />} />
      <Route path="/buy/:sku/cancel" element={<BuyCancelPage />} />

      {/* Blog */}
      <Route path="/blog" element={<BlogIndex />} />
      <Route path="/blog/:slug" element={<BlogPost />} />

      {/* Keep the site strict: unknown routes go home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
