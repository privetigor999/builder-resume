import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { MainContainer } from "../../layouts/MainContainer/MainContainer";
import { animatedScroll } from "../../utils/animatedScroll";
import { getYears } from "../../utils/helpers/getYears";
import { months } from "../../utils/data";
import { experienceSchema } from "../../utils/schema/experienceSchema";
import { Category } from "../Category/Category";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import { SaveButton } from "../SaveButton/SaveButton";
import { useAuth } from "../../hooks/useAuth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { fetchResume } from "../../store/resumeData/resumeActions";
import { IBlockProps } from "../../types/types";
import { findIndex } from "../../utils/helpers/findIndex";

export const WorkExperienceBlock: React.FC<IBlockProps> = ({ id }) => {
  const [isFullfiled, setIsFullfiled] = React.useState<boolean>(false);

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
  const isWorking = watch("isWorkingNow", true);
  const { userId } = useAuth();
  const data = useAppSelector((state) => state.resumeData.data);
  const prevData = data?.experience;
  const years = getYears();
  const month = months;

  const onSubmit = async () => {
    const values = getValues();
    try {
      setIsFullfiled(true);
      await setDoc(doc(db, "resume", userId), {
        ...data,
        experience: { ...values, blockId: id },
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

  return (
    <MainContainer>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Category title="Опыт" icon="work">
          <Input
            {...register("companyName")}
            id="companyName"
            label="Название компании"
            defaultValue={prevData?.companyName}
            error={!!errors?.companyName}
            helperText={errors?.companyName?.message}
            required
          />
          <Input
            {...register("position")}
            id="position"
            label="Должность"
            defaultValue={prevData?.position}
            error={!!errors?.position}
            helperText={errors?.position?.message}
            required
          />
          <Input
            {...register("department")}
            id="department"
            label="Отдел"
            defaultValue={prevData?.department}
            error={!!errors?.department}
            helperText={errors?.department?.message}
          />
          <Input
            {...register("startMonth")}
            id="startMonth"
            label="Месяц начала работы"
            defaultValue={
              prevData?.startMonth
                ? findIndex(month, prevData.startMonth)
                : month[0]
            }
            options={month}
            error={!!errors?.startMonth}
            helperText={errors?.startMonth?.message}
            select
            required
          />
          <Input
            {...register("startYear")}
            options={years}
            defaultValue={
              prevData?.startYear
                ? findIndex(years, prevData.startYear)
                : years[0]
            }
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
                defaultValue={
                  prevData?.endMonth
                    ? findIndex(month, prevData.endMonth)
                    : month[0]
                }
                options={month}
                select
              />
              <Input
                {...register("endYear")}
                id="endYear"
                label="Год окончания работы"
                defaultValue={
                  prevData?.endYear
                    ? findIndex(years, prevData.endYear)
                    : years[0]
                }
                options={years}
                select
              />
            </>
          )}
          <Input
            {...register("obligations")}
            id="obligations"
            label="Обязанности"
            defaultValue={prevData?.obligations}
            error={!!errors?.obligations}
            helperText={errors?.obligations?.message}
            multiline
            minRows={4}
            required
          />

          <Input
            {...register("link")}
            id="link"
            label="Ссылка на проект"
            defaultValue={prevData?.link}
            error={!!errors?.link}
            helperText={errors?.link?.message}
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
