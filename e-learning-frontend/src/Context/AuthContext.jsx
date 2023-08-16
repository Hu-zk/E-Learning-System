import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ModeContext = createContext();

export const ModeContexttProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  if (mode === "dark") {
    document.documentElement.style.setProperty("--white", "black");
    document.documentElement.style.setProperty("--black", "white");
  } else {
    document.documentElement.style.setProperty("--white", "white");
    document.documentElement.style.setProperty("--black", "black");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendRequest({
          route: "/user/shared/get-appearance",
        });
        console.log(mode);
        setMode(response.data);
      } catch (error) {
        console.error("failed:", error);
      }
    };
    fetchData();
  }, [mode]);

  return (
    <ModeContext.Provider value={{ mode }}>{children}</ModeContext.Provider>
  );
};
