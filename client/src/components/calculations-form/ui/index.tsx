import { ChangeEvent, FC, FormEvent } from "react";
import { TParametersFigure } from "src/types";
import { Button, TextField } from "@mui/material";

import { VALIDATE_VALUES } from "../config";
import "./style.css";

type TProps = {
  formState: TParametersFigure;
  verticesReq: boolean;
  errors: {
    [key in keyof TParametersFigure]?: string;
  };
  isFormValid: boolean;
  onSubmitForm: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const CalculationsFormUI: FC<TProps> = ({
  errors,
  formState,
  isFormValid,
  verticesReq,
  onChange,
  onSubmitForm,
}) => (
  <form onSubmit={onSubmitForm} className="calculate-form">
    <h3>Форма для изменения параметров фигуры</h3>
    <ul className="calculate-form__list">
      <li>
        <TextField
          className="calculate-form__input"
          defaultValue={formState.height}
          error={!!errors.height}
          helperText={errors.height}
          id="height"
          label="Высота"
          onChange={onChange}
          variant="outlined"
          type="number"
          InputProps={{
            inputProps: {
              min: VALIDATE_VALUES.min,
              max: VALIDATE_VALUES.max,
            },
          }}
        />
      </li>
      <li>
        <TextField
          className="calculate-form__input"
          defaultValue={formState.length}
          error={!!errors.length}
          helperText={errors.length}
          id="length"
          label="Длина"
          onChange={onChange}
          type="number"
          InputProps={{
            inputProps: {
              min: VALIDATE_VALUES.min,
              max: VALIDATE_VALUES.max,
            },
          }}
        />
      </li>
      <li>
        <TextField
          className="calculate-form__input"
          defaultValue={formState.width}
          error={!!errors.width}
          helperText={errors.width}
          id="width"
          label="Ширина"
          onChange={onChange}
          type="number"
          InputProps={{
            inputProps: {
              min: VALIDATE_VALUES.min,
              max: VALIDATE_VALUES.max,
            },
          }}
        />
      </li>
    </ul>
    <Button
      disabled={!isFormValid || verticesReq}
      variant="contained"
      type="submit"
      sx={{ mt: 2 }}>
      Изменить
    </Button>
  </form>
);
