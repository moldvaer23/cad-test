import { FC } from "react";
import { MainPage } from "src/pages/main";
import { ThemeProvider } from "src/components/theme-provider";

import "./style.css";

export const App: FC = () => (
  <div className="page">
    <ThemeProvider>
      <MainPage />
    </ThemeProvider>
  </div>
);
