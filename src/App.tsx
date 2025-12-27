import { Navigate, Route, Routes } from 'react-router-dom';
import { SaviorLanding } from './app/routes/savior/SaviorLanding';
import { BlogIndex } from './pages/blog/BlogIndex';
import { BlogPost } from './pages/blog/BlogPost';

export default function App() {
  return (
    <Routes>
      {/* Today: / is Savior */}
      <Route path="/" element={<SaviorLanding />} />

      {/* Future-proof: same page accessible at /savior */}
      <Route path="/savior" element={<SaviorLanding />} />

      {/* Blog */}
      <Route path="/blog" element={<BlogIndex />} />
      <Route path="/blog/:slug" element={<BlogPost />} />

      {/* Keep the site strict: unknown routes go home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
