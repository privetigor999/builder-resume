import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { MainContainer } from "../../layouts/MainContainer/MainContainer";
import { updateResume } from "../../store/resumeTab/resumeTabReducer";
import { animatedScroll } from "../../utils/animatedScroll";
import { languagesLevels } from "../../utils/data";
import { languagesSchema } from "../../utils/schema/languagesSchema";
import { Category } from "../Category/Category";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import { SaveButton } from "../SaveButton/SaveButton";

export const LanguagesBlock = () => {
  const dispatch = useAppDispatch();
  const [isFullfiled, setIsFullfiled] = React.useState<boolean>(false);

  const resume = useAppSelector((state) => state.resumeTab.resume);
  const languages = resume?.languages;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(languagesSchema),
  });

  const onSubmit = () => {
    const values = getValues();
    setIsFullfiled(true);
    dispatch(updateResume({ languages: values }));
    animatedScroll();
    console.log(values);
  };

  const onError = () => {
    setIsFullfiled(false);
    const values = getValues();
    console.log(values);
  };
  return (
    <MainContainer>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Category title="Владение языком" icon="languages">
          <Input
            {...register("language1")}
            id="language1"
            label="Язык"
            defaultValue={languages?.language1}
            error={!!errors?.language1}
            helperText={errors?.language1?.message}
            required
          />
          <Input
            {...register("languageLevel1")}
            id="languageLevel1"
            label="Уровень владения"
            defaultValue={languagesLevels[0]}
            options={languagesLevels}
            select
          />
        </Category>

        <Category title="Дополнительный язык" icon="languages">
          <Input
            {...register("language2")}
            id="language2"
            label="Язык"
            defaultValue={languages?.language2}
            error={!!errors?.language2}
            helperText={errors?.language2?.message}
            required
          />
          <Input
            {...register("languageLevel2")}
            id="languageLevel2"
            label="Уровень владения"
            defaultValue={languagesLevels[0]}
            options={languagesLevels}
            select
          />
        </Category>
        <SaveButton
          isFullfiled={isFullfiled}
          title={"Данные о ваших языках обновлены"}
        >
          Сохранить
        </SaveButton>
      </Form>
    </MainContainer>
  );
};
