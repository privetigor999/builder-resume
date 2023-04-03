import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { doc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { db } from "../../../firebase";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { useAuth } from "../../hooks/useAuth";
import { MainContainer } from "../../layouts/MainContainer/MainContainer";
import { fetchResume } from "../../store/resumeData/resumeActions";
import { IBlockProps } from "../../types/types";
import { animatedScroll } from "../../utils/animatedScroll";
import { skillsSchema } from "../../utils/schema/skillsSchema";
import { Category } from "../Category/Category";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import { SaveButton } from "../SaveButton/SaveButton";

export const Skills: React.FC<IBlockProps> = ({ id }) => {
  const [isFulfilled, setIsFulfilled] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.resumeData.data);
  const prevData = data?.skills;
  const { userId } = useAuth();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(skillsSchema),
  });
  const onSubmit = async () => {
    const values = getValues();
    try {
      setIsFulfilled(true);
      await setDoc(doc(db, "resume", userId), {
        ...data,
        skills: { ...values, blockId: id },
      });
      animatedScroll();
      dispatch(fetchResume());
    } catch (error) {
      setIsFulfilled(false);
      console.log(error);
    }
  };

  const onError = () => {
    setIsFulfilled(false);
  };
  return (
    <MainContainer>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Category title="Добавьте свои навыки" icon="skill">
          <Input
            {...register("skill1")}
            id="skill1"
            label="Навык 1"
            defaultValue={prevData?.skill1}
            error={!!errors?.skill1}
            helperText={errors?.skill1?.message}
            required
          />
          <Input
            {...register("skill2")}
            id="skill2"
            label="Навык 2"
            defaultValue={prevData?.skill2}
            error={!!errors?.skill2}
            helperText={errors?.skill2?.message}
            required
          />
          <Input
            {...register("skill3")}
            id="skill3"
            label="Навык 3"
            defaultValue={prevData?.skill3}
            error={!!errors?.skill3}
            helperText={errors?.skill3?.message}
          />
          <Input
            {...register("skill4")}
            id="skill4"
            label="Навык 4"
            defaultValue={prevData?.skill4}
            error={!!errors?.skill4}
            helperText={errors?.skill4?.message}
          />
          <Input
            {...register("skill5")}
            id="skill5"
            label="Навык 5"
            defaultValue={prevData?.skill5}
            error={!!errors?.skill5}
            helperText={errors?.skill5?.message}
          />
        </Category>
        <SaveButton
          isFulfilled={isFulfilled}
          title={"Данные о ваших умениях обновлены"}
        >
          Сохранить
        </SaveButton>
      </Form>
    </MainContainer>
  );
};
