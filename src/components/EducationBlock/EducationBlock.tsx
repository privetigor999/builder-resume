import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Category } from "../Category/Category";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import { MainContainer } from "../../layouts/MainContainer/MainContainer";
import { SaveButton } from "../SaveButton/SaveButton";
import { animatedScroll } from "../../utils/animatedScroll";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { updateResume } from "../../store/resumeTab/resumeTabReducer";
import { educationSchema } from "../../utils/schema/educationSchema";
import { getYears } from "../../utils/getYears";

import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { Add } from "@mui/icons-material";

export const EducationBlock: React.FC = () => {
  const [isFullfiled, setIsFullfiled] = React.useState<boolean>(false);
  const [countEducation, setCountEducation] = React.useState<number>(1);

  const resume = useAppSelector((state) => state.resumeTab.resume);
  const education = resume?.education;

  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(educationSchema),
  });

  const isLearningNow = watch("isLearningNow", true);

  const onSubmit = () => {
    const values = getValues();
    console.log(values);
    setIsFullfiled(true);
    dispatch(updateResume({ education: values }));
    animatedScroll();
  };

  const onError = () => {
    const values = getValues();
    console.log(values);
    setIsFullfiled(false);
  };

  const years = getYears();
  const academicDegrees = [
    "Студент",
    "Бакалавриат",
    "Магистратура",
    "Кандидат наук",
  ];

  return (
    <MainContainer>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Category title="Образование" icon="education">
          <Input
            {...register("university")}
            id="education"
            label="Название университета"
            defaultValue={education?.university}
            error={!!errors.university}
            helperText={errors?.university?.message}
            required
          />
          <Input
            {...register("startedLearn")}
            id="startedLearn"
            label="Начало обучения"
            options={years}
            defaultValue={years[0]}
            error={!!errors.startedLearn}
            helperText={errors?.startedLearn?.message}
            select
            required
          />
          <FormControlLabel
            label="Еще учусь"
            control={
              <Checkbox
                {...register("isLearningNow")}
                id="isLearningNow"
                color="primary"
                defaultChecked
              />
            }
            sx={{ marginBottom: "20px" }}
          />
          {!isLearningNow && (
            <Input
              {...register("finishedLearn")}
              id="finishedLearn"
              label="Конец обучения"
              options={years}
              defaultValue={years[0]}
              error={!!errors.finishedLearn}
              helperText={errors?.finishedLearn?.message}
              select
            />
          )}
          <Input
            {...register("academicDegree")}
            id="academicDegree"
            label="Академическая степень"
            options={academicDegrees}
            defaultValue={academicDegrees[0]}
            select
          />
          <Input
            {...register("faculty")}
            id="faculty"
            label="Факультет"
            error={!!errors?.faculty}
            helperText={errors?.faculty?.message}
            defaultValue={education?.faculty}
            required
          />
          <Input
            {...register("specialization")}
            id="specialization"
            label="Специализация"
            error={!!errors?.specialization}
            helperText={errors?.specialization?.message}
            defaultValue={education?.specialization}
          />
        </Category>

        <SaveButton
          title="Данные об образовании сохранены"
          isFullfiled={isFullfiled}
        >
          Сохранить
        </SaveButton>
      </Form>
    </MainContainer>
  );
};
