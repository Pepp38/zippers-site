import { Navigate, Route, Routes } from "react-router-dom";

import { SaviorShell } from "./app/layout/SaviorShell";
import { SaviorLanding } from "./app/routes/savior/SaviorLanding";

import { BuyPage } from "./app/routes/buy/BuyPage";
import { BuySuccessPage } from "./app/routes/buy/BuySuccessPage";
import { BuyCancelPage } from "./app/routes/buy/BuyCancelPage";

import { SafeStateRecoveryPage } from "./app/routes/products/SafeStateRecoveryPage";

import { LearnPage } from "./app/routes/learn/LearnPage";
import { SolutionsIndex } from "./app/routes/solutions/SolutionsIndex";
import { SolutionPage } from "./app/routes/solutions/SolutionPage";
import { ConceptIndex } from "./app/routes/concepts/ConceptIndex";
import { ConceptPage } from "./app/routes/concepts/ConceptPage";

import { UndoAiLanding } from "./app/routes/undo-ai/UndoAiLanding";

import { BlogIndex } from "./pages/blog/BlogIndex";
import { BlogPost } from "./pages/blog/BlogPost";

import { SupportModal } from "./components/support/SupportModal";

export default function App() {
  return (
    <>
      <Routes>
        {/* Shared shell for Savior + Buy */}
        <Route element={<SaviorShell />}>
          <Route path="/" element={<SaviorLanding />} />
          <Route path="/savior" element={<SaviorLanding />} />

          {/* Undo-AI */}
          <Route path="/undo-ai" element={<UndoAiLanding />} />

          {/* Products */}
          <Route
            path="/products/safestate-recovery"
            element={<SafeStateRecoveryPage />}
          />

          {/* Buy flow */}
          <Route path="/buy/:sku" element={<BuyPage />} />
          <Route path="/buy/:sku/success" element={<BuySuccessPage />} />
          <Route path="/buy/:sku/cancel" element={<BuyCancelPage />} />
        </Route>

        {/* Learn hub */}
        <Route path="/learn" element={<LearnPage />} />

        {/* Solutions */}
        <Route path="/solutions" element={<SolutionsIndex />} />
        <Route path="/solutions/:slug" element={<SolutionPage />} />

        {/* Concepts */}
        <Route path="/concepts" element={<ConceptIndex />} />
        <Route path="/concepts/:slug" element={<ConceptPage />} />

        {/* Blog */}
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPost />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <SupportModal />
    </>
  );
}
