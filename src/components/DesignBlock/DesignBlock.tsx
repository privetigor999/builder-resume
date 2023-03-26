import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { MainContainer } from "../../layouts/MainContainer/MainContainer";
import { updateResume } from "../../store/resumeTab/resumeTabReducer";
import { animatedScroll } from "../../utils/animatedScroll";
import { Form } from "../Form/Form";
import { SaveButton } from "../SaveButton/SaveButton";
import { DesignItem } from "./DesignItem/DesignItem";

import standartImg from "./../../../public/standart.png";

export const DesignBlock = () => {
  const [value, setValue] = React.useState("standart");

  const dispatch = useAppDispatch();
  const { handleSubmit } = useForm({
    mode: "onBlur",
  });

  const designItems = [
    {
      id: 1,
      value: "standart",
      label: "Стандартный",
      img: standartImg,
    },
    {
      id: 2,
      value: "new",
      label: "Новый",
      img: "https://i.stack.imgur.com/yZQB0.png?s=64&g=1",
    },
  ];

  const onSubmit = () => {
    dispatch(updateResume({ design: value }));
    animatedScroll();
    console.log(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <MainContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <RadioGroup
          aria-labelledby="design-resume"
          defaultValue="standart"
          name="design-resume"
          value={value}
          onChange={handleChange}
          sx={{
            width: "100%",
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {designItems.map((design) => (
            <DesignItem key={design.id} {...design} />
          ))}
        </RadioGroup>
        <SaveButton title="Выбор дизайна сохранен" isFullfiled={true}>
          Сохранить
        </SaveButton>
      </Form>
    </MainContainer>
  );
};
