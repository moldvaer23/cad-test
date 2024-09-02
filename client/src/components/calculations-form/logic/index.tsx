import { ChangeEvent, FC, FormEvent, useState } from "react";
import { TParametersFigure } from "src/types";
import { DEFAULT_PARAMETERS_FIGURE } from "src/config";
import { useDispatch, useSelector } from "src/services/store";
import {
  getVerticesReq,
  postTriangulateThunk,
} from "src/services/slices/global";

import { CalculationsFormUI } from "../ui";
import { VALIDATE_VALUES } from "../config";

export const CalculationsForm: FC = () => {
  const [formState, setFormState] = useState<TParametersFigure>(
    DEFAULT_PARAMETERS_FIGURE
  );
  const [errors, setErrors] = useState<{
    [key in keyof TParametersFigure]?: string;
  }>({});

  const verticesReq = useSelector(getVerticesReq);
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
    <CalculationsFormUI
      errors={errors}
      formState={formState}
      verticesReq={verticesReq}
      isFormValid={isFormValid}
      onChange={onChange}
      onSubmitForm={onSubmitForm}
    />
  );
};
