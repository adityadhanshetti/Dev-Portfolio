import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { FLAGS } from "@/lib/flags";

type PreloaderPhase = "loading" | "revealing" | "done";

interface PreloaderContextValue {
  phase: PreloaderPhase;
  progress: number;
  setProgress: (val: number) => void;
  startReveal: () => void;
  finishPreloader: () => void;
}

const PreloaderContext = createContext<PreloaderContextValue>({
  phase: "loading",
  progress: 0,
  setProgress: () => {},
  startReveal: () => {},
  finishPreloader: () => {},
});

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<PreloaderPhase>(() =>
    FLAGS.PRELOADER ? "loading" : "done"
  );
  const [progress, setProgress] = useState(0);

  const startReveal = () => {
    setPhase("revealing");
  };

  const finishPreloader = () => {
    setPhase("done");
  };

  return (
    <PreloaderContext.Provider
      value={{
        phase,
        progress,
        setProgress,
        startReveal,
        finishPreloader,
      }}
    >
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloader() {
  return useContext(PreloaderContext);
}

