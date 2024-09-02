import { FC } from "react";

import { Scene } from "src/components/scene";
import { ButtonToggleTheme } from "src/components/theme-provider";
import { CalculationsForm } from "src/components/calculations-form";

import "./style.css";

export const MainPage: FC = () => (
  <>
    <aside className="page__aside">
      <ButtonToggleTheme />
      <CalculationsForm />
    </aside>
    <main className="page__main">
      <Scene />
    </main>
  </>
);
