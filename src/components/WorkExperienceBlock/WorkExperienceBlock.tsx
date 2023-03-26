import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { MainContainer } from "../../layouts/MainContainer/MainContainer";
import { updateResume } from "../../store/resumeTab/resumeTabReducer";
import { animatedScroll } from "../../utils/animatedScroll";
import { getYears } from "../../utils/getYears";
import { months } from "../../utils/data";
import { experienceSchema } from "../../utils/schema/experienceSchema";
import { Category } from "../Category/Category";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import { SaveButton } from "../SaveButton/SaveButton";

export const WorkExperienceBlock = () => {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(experienceSchema),
  });
  const dispatch = useAppDispatch();
  const [isFullfiled, setIsFullfiled] = React.useState<boolean>(false);
  const isWorking = watch("isWorkingNow", true);

  const resume = useAppSelector((state) => state.resumeTab.resume);
  const experience = resume?.experience;

  const years = getYears();
  const month = months;

  const onSubmit = () => {
    const values = getValues();
    setIsFullfiled(true);
    dispatch(updateResume({ experience: values }));
    animatedScroll();
    console.log(values);
  };

  const onError = () => {
    setIsFullfiled(false);
  };

  return (
    <MainContainer>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Category title="Опыт" icon="work">
          <Input
            {...register("companyName")}
            id="companyName"
            label="Название компании"
            defaultValue={experience?.companyName}
            error={!!errors?.companyName}
            helperText={errors?.companyName?.message}
            required
          />
          <Input
            {...register("position")}
            id="position"
            label="Должность"
            defaultValue={experience?.position}
            error={!!errors?.position}
            helperText={errors?.position?.message}
            required
          />
          <Input
            {...register("department")}
            id="department"
            label="Отдел"
            defaultValue={experience?.department}
            error={!!errors?.department}
            helperText={errors?.department?.message}
          />
          <Input
            {...register("startMonth")}
            id="startMonth"
            label="Месяц начала работы"
            defaultValue={month[0]}
            options={month}
            error={!!errors?.startMonth}
            helperText={errors?.startMonth?.message}
            select
            required
          />
          <Input
            {...register("startYear")}
            options={years}
            defaultValue={years[0]}
            id="startYear"
            label="Год начала работы"
            error={!!errors?.startYear}
            helperText={errors?.startYear?.message}
            select
            required
          />
          <FormControlLabel
            label="Еще здесь работаю"
            control={
              <Checkbox
                {...register("isWorkingNow")}
                id="isWorkingNow"
                color="primary"
                defaultChecked
              />
            }
            sx={{ marginBottom: "20px" }}
          />
          {!isWorking && (
            <>
              <Input
                {...register("endMonth")}
                id="endMonth"
                label="Месяц окончания работы"
                defaultValue={month[0]}
                options={month}
                select
              />
              <Input
                {...register("endYear")}
                id="endYear"
                label="Год окончания работы"
                defaultValue={years[0]}
                options={years}
                select
              />
            </>
          )}
          <Input
            {...register("obligations")}
            id="obligations"
            label="Обязанности"
            defaultValue={experience?.obligations}
            error={!!errors?.obligations}
            helperText={errors?.obligations?.message}
            multiline
            minRows={4}
            required
          />
          <SaveButton
            isFullfiled={isFullfiled}
            title={"Данные о вашем опыте обновлены"}
          >
            Сохранить
          </SaveButton>
        </Category>
      </Form>
    </MainContainer>
  );
};
