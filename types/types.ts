import { ReactNode } from "react";

export interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export interface ThemeProviderProps {
  children: ReactNode;
}

export type Task = {
  id: string;
  title: string;
  description: string;
  user: string | null;
  country: string | null;
};
