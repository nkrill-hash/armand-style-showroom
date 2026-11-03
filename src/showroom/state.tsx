import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type Screen =
  | { name: "home" }
  | { name: "explore" }
  | { name: "category"; id: string }
  | { name: "product"; id: string }
  | { name: "spaces" }
  | { name: "space"; id: string }
  | { name: "services" }
  | { name: "projects" }
  | { name: "featured" }
  | { name: "contact" };

export type Mode = "attract" | "interactive";

export type EnquiryTarget = { productId?: string } | null;

interface ShowroomState {
  mode: Mode;
  screen: Screen;
  canGoBack: boolean;
  enquiry: EnquiryTarget;
  start: () => void;
  go: (screen: Screen) => void;
  back: () => void;
  home: () => void;
  reset: () => void;
  openEnquiry: (target?: { productId?: string }) => void;
  closeEnquiry: () => void;
}

const Ctx = createContext<ShowroomState | null>(null);

export function ShowroomProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("attract");
  const [stack, setStack] = useState<Screen[]>([{ name: "home" }]);
  const [enquiry, setEnquiry] = useState<EnquiryTarget>(null);

  const go = useCallback((screen: Screen) => {
    setEnquiry(null);
    setStack((s) => [...s, screen]);
  }, []);
  const back = useCallback(() => {
    setEnquiry(null);
    setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));
  }, []);
  const home = useCallback(() => {
    setEnquiry(null);
    setStack([{ name: "home" }]);
  }, []);
  const start = useCallback(() => {
    setStack([{ name: "home" }]);
    setMode("interactive");
  }, []);
  const reset = useCallback(() => {
    setEnquiry(null);
    setStack([{ name: "home" }]);
    setMode("attract");
  }, []);

  const value = useMemo<ShowroomState>(
    () => ({
      mode,
      screen: stack[stack.length - 1]!,
      canGoBack: stack.length > 1,
      enquiry,
      start,
      go,
      back,
      home,
      reset,
      openEnquiry: (t) => setEnquiry(t ?? {}),
      closeEnquiry: () => setEnquiry(null),
    }),
    [mode, stack, enquiry, start, go, back, home, reset],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useShowroom() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useShowroom must be used inside ShowroomProvider");
  return v;
}

export const screenKey = (s: Screen) => ("id" in s ? `${s.name}:${s.id}` : s.name);
