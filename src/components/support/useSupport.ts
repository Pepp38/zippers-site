// src/components/support/useSupport.ts
import { useContext } from "react";
import { SupportContext } from "./SupportContext";

export function useSupport() {
  const ctx = useContext(SupportContext);
  if (!ctx) {
    throw new Error("useSupport must be used within <SupportProvider>.");
  }
  return ctx;
}
