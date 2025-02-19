"use client"
import { createContext, useContext, useState, useEffect } from "react";
import { eventEmitter } from "@/app/api/globalstate/route"; // API event emitter import

const GlobalStateContext = createContext<{
  isActive: boolean;
  toggleActive: () => Promise<void>;
}>({
  isActive: false,
  toggleActive: async () => {},
});

export function GlobalStateProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false);

  // API'den state'i güncelle
  useEffect(() => {
    async function fetchState() {
      const res = await fetch("/api/globalstate",{ cache: "no-store" });
      const data = await res.json();
    
      setIsActive(data.isActive);
    }

    fetchState();

    // Global state değiştikçe dinle
    eventEmitter.on("stateChanged", setIsActive);
    return () => {
      eventEmitter.off("stateChanged", setIsActive);
    };
  }, []);

  // API'yi çağırarak state değiştir
  const toggleActive = async () => {
    const res = await fetch("/api/globalstate", { method: "POST" ,cache:"no-store"});
    const data = await res.json();
    setIsActive(data.isActive);
  };

  return (
    <GlobalStateContext.Provider value={{ isActive, toggleActive }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  return useContext(GlobalStateContext);
}
