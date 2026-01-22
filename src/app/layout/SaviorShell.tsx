import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./saviorShell.css";

export function SaviorShell() {
  useEffect(() => {
    document.body.classList.add("savior-shell");
    return () => document.body.classList.remove("savior-shell");
  }, []);

  return (
    <div className="min-h-screen text-slate-100">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <Outlet />
      </div>
    </div>
  );
}
