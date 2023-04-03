import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { doc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { db } from "../../../firebase";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { useAuth } from "../../hooks/useAuth";
import { MainContainer } from "../../layouts/MainContainer/MainContainer";
import { fetchResume } from "../../store/resumeData/resumeActions";
import { IBlockProps, ICourses } from "../../types/types";
import { animatedScroll } from "../../utils/animatedScroll";
import { findIndex } from "../../utils/helpers/findIndex";
import { getYears } from "../../utils/helpers/getYears";
import { showFetchError } from "../../utils/helpers/showFetchError";
import { coursesSchema } from "../../utils/schema/coursesSchema";
import { Category } from "../Category/Category";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import { SaveButton } from "../SaveButton/SaveButton";

export const CoursesBlock: React.FC<IBlockProps> = React.memo(({ id }) => {
  const [isFulfilled, setIsFulfilled] = React.useState<boolean>(false);

  const years = getYears();
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.resumeData.data);
  const prevData = React.useMemo(() => data?.courses, [data]);
  const { userId } = useAuth();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ICourses>({
    mode: "onBlur",
    resolver: yupResolver(coursesSchema),
  });

  const onSubmit = async () => {
    const values = getValues();
    try {
      setIsFulfilled(true);
      const dataToUpdate = { ...data, courses: { ...values, blockId: id } };
      await setDoc(doc(db, "resume", userId), dataToUpdate);
      animatedScroll();
      dispatch(fetchResume());
    } catch (error) {
      setIsFulfilled(false);
      showFetchError(onSubmit);
    }
  };

  const onError = () => {
    setIsFulfilled(false);
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
            defaultValue={
              prevData?.coursesEnd
                ? findIndex(years, prevData.coursesEnd)
                : years[0]
            }
            options={years}
            select
          />
        </Category>
        <SaveButton
          isFulfilled={isFulfilled}
          title={"Данные о ваших курсах обновлены"}
        >
          Сохранить
        </SaveButton>
      </Form>
    </MainContainer>
  );
});
