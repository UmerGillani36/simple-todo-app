import { ThemeContextType, ThemeProviderProps } from "@/types/types";
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
} from "react";
import { useColorScheme } from "react-native";


const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});


export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<"light" | "dark">(
    colorScheme as "light" | "dark"
  );

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
