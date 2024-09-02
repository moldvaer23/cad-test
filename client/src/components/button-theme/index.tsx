import { FC, useEffect } from "react";
import { Switch } from "@mui/material";
import { useDispatch, useSelector } from "src/services/store";
import { getTheme, toggleTheme } from "src/services/slices/global";

import "./style.css";

type TProps = {
  className?: string;
};

export const ButtonToggleTheme: FC<TProps> = ({ className }) => {
  const theme = useSelector(getTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    /* Обновляем класс на теге <body> */
    if (theme === "dark") {
      document.documentElement.classList.add("dark-theme");
    } else {
      document.documentElement.classList.remove("dark-theme");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="button-theme__wrapper">
      <span>Светлая</span>
      <Switch
        className={className && className}
        checked={theme === "dark" ? true : false}
        onChange={() => dispatch(toggleTheme())}
      />
      <span>Темная</span>
    </div>
  );
};
