import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { MainContainer } from "../../layouts/MainContainer/MainContainer";
import { updateResume } from "../../store/resumeTab/resumeTabReducer";
import { animatedScroll } from "../../utils/animatedScroll";
import { getYears } from "../../utils/getYears";
import { coursesSchema } from "../../utils/schema/coursesSchema";
import { Category } from "../Category/Category";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import { SaveButton } from "../SaveButton/SaveButton";

export const CoursesBlock = () => {
  const [isFullfiled, setIsFullfiled] = React.useState<boolean>(false);

  const years = getYears();
  const dispatch = useAppDispatch();
  const resume = useAppSelector((state) => state.resumeTab.resume);
  const courses = resume?.courses;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(coursesSchema),
  });

  const onSubmit = () => {
    const values = getValues();
    setIsFullfiled(true);
    dispatch(updateResume({ courses: values }));
    animatedScroll();
    console.log(values);
  };

  const onError = () => {
    setIsFullfiled(false);
  };

  return (
    <MainContainer>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Category title="Курсы" icon="courses">
          <Input
            {...register("coursesCompany")}
            id="coursesCompany"
            label="Название учреждения"
            defaultValue={courses?.coursesCompany}
            error={!!errors?.coursesCompany}
            helperText={errors?.coursesCompany?.message}
            required
          />
          <Input
            {...register("coursesName")}
            id="coursesName"
            label="Название курса"
            defaultValue={courses?.coursesName}
            error={!!errors?.coursesName}
            helperText={errors?.coursesName?.message}
            required
          />
          <Input
            {...register("coursesEnd")}
            id="coursesEnd"
            label="Год окончания курсов"
            defaultValue={years[0]}
            options={years}
            select
          />
        </Category>
        <SaveButton
          isFullfiled={isFullfiled}
          title={"Данные о ваших курсах обновлены"}
        >
          Сохранить
        </SaveButton>
      </Form>
    </MainContainer>
  );
};
