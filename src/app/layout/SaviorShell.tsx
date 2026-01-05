// src/app/layout/SaviorShell.tsx
import { Outlet } from 'react-router-dom';

export function SaviorShell() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <Outlet />
      </div>
    </div>
  );
}
