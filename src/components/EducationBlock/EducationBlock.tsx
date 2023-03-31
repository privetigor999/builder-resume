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
import { educationSchema } from "../../utils/schema/educationSchema";
import { getYears } from "../../utils/helpers/getYears";
import { findIndex } from "../../utils/helpers/findIndex";
import { Checkbox, FormControlLabel } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useAuth } from "../../hooks/useAuth";
import { fetchResume } from "../../store/resumeData/resumeActions";
import { IBlockProps } from "../../types/types";
import { academicDegrees } from "../../utils/data";

export const EducationBlock: React.FC<IBlockProps> = ({ id }) => {
  const [isFullfiled, setIsFullfiled] = React.useState<boolean>(false);

  const data = useAppSelector((state) => state.resumeData.data);
  const prevData = data?.education;
  const { userId } = useAuth();
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

  const onSubmit = async () => {
    const values = getValues();
    try {
      setIsFullfiled(true);
      await setDoc(doc(db, "resume", userId), {
        ...data,
        education: { ...values, blockId: id },
      });
      animatedScroll();
      dispatch(fetchResume());
    } catch (error) {
      setIsFullfiled(false);
      console.log(error);
    }
  };

  const onError = () => {
    setIsFullfiled(false);
  };

  const years = getYears();

  return (
    <MainContainer>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Category title="Образование" icon="education">
          <Input
            {...register("university")}
            id="education"
            label="Название университета"
            defaultValue={prevData?.university}
            error={!!errors.university}
            helperText={errors?.university?.message}
            required
          />
          <Input
            {...register("startedLearn")}
            id="startedLearn"
            label="Начало обучения"
            options={years}
            defaultValue={
              prevData?.startedLearn
                ? findIndex(years, prevData.startedLearn)
                : years[0]
            }
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
              defaultValue={
                prevData?.finishedLearn
                  ? findIndex(years, prevData.finishedLearn)
                  : years[0]
              }
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
            defaultValue={prevData?.faculty}
            required
          />
          <Input
            {...register("specialization")}
            id="specialization"
            label="Специализация"
            error={!!errors?.specialization}
            helperText={errors?.specialization?.message}
            defaultValue={prevData?.specialization}
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
