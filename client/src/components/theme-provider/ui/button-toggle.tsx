import { FC, useContext } from "react";
import { Switch } from "@mui/material";

import { ThemeContext } from "./index";

import "./style.css";

type TProps = {
  className?: string;
};

export const ButtonToggleTheme: FC<TProps> = ({ className }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="button-theme__wrapper">
      <span>Светлая</span>
      <Switch
        className={className && className}
        checked={theme === "dark" ? true : false}
        onChange={() => toggleTheme()}
      />
      <span>Темная</span>
    </div>
  );
};
