import { Button, TextField } from "@mui/material";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { DEFAULT_PARAMETERS_FIGURE } from "src/config";
import { TParametersFigure } from "src/types";

import "./style.css";
import { useDispatch } from "src/services/store";
import { postTriangulateThunk } from "src/services/slices/global";

const VALIDATE_VALUES = {
  min: 5,
  max: 100,
};

export const CalculationsForm: FC = () => {
  const [formState, setFormState] = useState<TParametersFigure>(
    DEFAULT_PARAMETERS_FIGURE
  );
  const [errors, setErrors] = useState<{
    [key in keyof TParametersFigure]?: string;
  }>({});

  const dispatch = useDispatch();

  const validate = (value: number): string | undefined => {
    if (value < VALIDATE_VALUES.min)
      return `Значение должно быть не меньше ${VALIDATE_VALUES.min}`;
    if (value > VALIDATE_VALUES.max)
      return `Значение должно быть не больше ${VALIDATE_VALUES.max}`;
    return;
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.getAttribute("id") as keyof TParametersFigure;

    if (!id) return;

    const value = Number(e.target.value);
    const validationError = validate(value);

    setFormState((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: validationError,
    }));
  };

  const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: { [key in keyof TParametersFigure]?: string } = {};

    /* Снова проверяем все поля на предмет ошибок */
    Object.keys(formState).forEach((key) => {
      const value = formState[key as keyof TParametersFigure];
      const error = validate(value);
      if (error) {
        newErrors[key as keyof TParametersFigure] = error;
      }
    });

    setErrors(newErrors);

    /* Проверяем есть ли какие-либо новые ошибки */
    if (Object.keys(newErrors).length === 0) {
      dispatch(postTriangulateThunk(formState));
    }
  };

  /* Если в форме есть запись то устанавливаем true что бы */
  /* отключить кнопку подтверждения формы */
  const isFormValid = Object.values(errors).every((error) => !error);

  return (
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
        disabled={!isFormValid}
        variant="contained"
        type="submit"
        sx={{ mt: 2 }}>
        Изменить
      </Button>
    </form>
  );
};
