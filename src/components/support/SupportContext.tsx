// src/components/support/SupportContext.tsx
import React, { createContext, useCallback, useMemo, useState } from "react";

export type SupportModalPrefill = {
  subject?: string;
  message?: string;
  pagePath?: string;
};

type SupportContextValue = {
  isOpen: boolean;
  prefill: SupportModalPrefill | null;
  openSupport: (prefill?: SupportModalPrefill) => void;
  closeSupport: () => void;
};

export const SupportContext = createContext<SupportContextValue | null>(null);

export function SupportProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState<SupportModalPrefill | null>(null);

  const openSupport = useCallback((next?: SupportModalPrefill) => {
    setPrefill(next ?? null);
    setIsOpen(true);
  }, []);

  const closeSupport = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo<SupportContextValue>(
    () => ({ isOpen, prefill, openSupport, closeSupport }),
    [isOpen, prefill, openSupport, closeSupport],
  );

  return <SupportContext.Provider value={value}>{children}</SupportContext.Provider>;
}
