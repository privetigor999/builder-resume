import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { MainContainer } from "../../layouts/MainContainer/MainContainer";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import { feedBackSchema } from "../../utils/schema/feedbackSchema";
import { SaveButton } from "../SaveButton/SaveButton";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { fetchForm } from "../../store/feedbackSlice/feedBackAction";

import "./feedback.scss";

export const Feedback: React.FC = () => {
  const [isFullfiled, setIsFullfiled] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(feedBackSchema),
  });

  const onSubmit = () => {
    const formValues = getValues();
    dispatch(fetchForm(formValues));
    setIsFullfiled(true);
  };

  const onError = () => {
    setIsFullfiled(false);
  };
  return (
    <div className="feedback">
      <h5>Форма обратной связи</h5>

      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Input
          {...register("name")}
          error={!!errors?.name}
          helperText={errors?.name?.message}
          label="Имя"
          width={"80%"}
          required
        />
        <Input
          {...register("email")}
          error={!!errors?.email}
          helperText={errors?.email?.message}
          label="Почта"
          width={"80%"}
        />
        <Input
          {...register("message")}
          label="Текст обратной связи"
          error={!!errors?.message}
          helperText={errors?.message?.message}
          width={"80%"}
          multiline
          minRows={3}
          required
        />
        <SaveButton
          isFullfiled={isFullfiled}
          title="Сообщение отправлено"
          withIcon={false}
        >
          Отправить
        </SaveButton>
      </Form>
    </div>
  );
};
