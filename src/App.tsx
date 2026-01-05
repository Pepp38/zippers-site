import { Navigate, Route, Routes } from 'react-router-dom';
import { SaviorLanding } from './app/routes/savior/SaviorLanding';
import { BuyPage } from './app/routes/buy/BuyPage';
import { BuySuccessPage } from './app/routes/buy/BuySuccessPage';
import { BuyCancelPage } from './app/routes/buy/BuyCancelPage';
import { BlogIndex } from './pages/blog/BlogIndex';
import { BlogPost } from './pages/blog/BlogPost';
import { SaviorShell } from './app/layout/SaviorShell';

export default function App() {
  return (
    <Routes>
      {/* Shared shell for Savior + Buy */}
      <Route element={<SaviorShell />}>
        <Route path="/" element={<SaviorLanding />} />
        <Route path="/savior" element={<SaviorLanding />} />

        {/* Buy flow */}
        <Route path="/buy/:sku" element={<BuyPage />} />
        <Route path="/buy/:sku/success" element={<BuySuccessPage />} />
        <Route path="/buy/:sku/cancel" element={<BuyCancelPage />} />
      </Route>

      {/* Blog (can have its own shell later if you want) */}
      <Route path="/blog" element={<BlogIndex />} />
      <Route path="/blog/:slug" element={<BlogPost />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
