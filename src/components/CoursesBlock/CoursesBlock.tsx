import { yupResolver } from "@hookform/resolvers/yup";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { useForm } from "react-hook-form";
import { db } from "../../../firebase";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { useAuth } from "../../hooks/useAuth";
import { MainContainer } from "../../layouts/MainContainer/MainContainer";
import { fetchResume } from "../../store/resumeData/resumeActions";
import { IBlockProps } from "../../types/types";
import { animatedScroll } from "../../utils/animatedScroll";
import { getYears } from "../../utils/getYears";
import { coursesSchema } from "../../utils/schema/coursesSchema";
import { Category } from "../Category/Category";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import { SaveButton } from "../SaveButton/SaveButton";

export const CoursesBlock: React.FC<IBlockProps> = ({ id }) => {
  const [isFullfiled, setIsFullfiled] = React.useState<boolean>(false);

  const years = getYears();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.resumeData.data);
  const prevData = data?.courses;
  const { userId } = useAuth();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(coursesSchema),
  });

  const onSubmit = async () => {
    const values = getValues();
    try {
      setIsFullfiled(true);
      await setDoc(doc(db, "resume", userId), {
        ...data,
        courses: { ...values, blockId: id },
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
        <Category title="Курсы" icon="courses">
          <Input
            {...register("coursesCompany")}
            id="coursesCompany"
            label="Название учреждения"
            defaultValue={prevData?.coursesCompany}
            error={!!errors?.coursesCompany}
            helperText={errors?.coursesCompany?.message}
            required
          />
          <Input
            {...register("coursesName")}
            id="coursesName"
            label="Название курса"
            defaultValue={prevData?.coursesName}
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
