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
import { languagesLevels } from "../../utils/data";
import { showFetchError } from "../../utils/helpers/showFetchError";
import { languagesSchema } from "../../utils/schema/languagesSchema";
import { Category } from "../Category/Category";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import { SaveButton } from "../SaveButton/SaveButton";

export const LanguagesBlock: React.FC<IBlockProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const [isFulfilled, setIsFulfilled] = React.useState<boolean>(false);

  const { userId } = useAuth();
  const data = useAppSelector((state) => state.resumeData.data);
  const prevData = data?.languages;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(languagesSchema),
  });

  const onSubmit = async () => {
    const values = getValues();
    try {
      setIsFulfilled(true);
      const dataToUpdate = {
        ...data,
        languages: { ...values, blockId: id },
      };
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
    const values = getValues();
  };
  return (
    <MainContainer>
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Category title="Владение языком" icon="languages">
          <Input
            {...register("language1")}
            id="language1"
            label="Язык"
            defaultValue={prevData?.language1}
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
            defaultValue={prevData?.language2}
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
          isFulfilled={isFulfilled}
          title={"Данные о ваших языках обновлены"}
        >
          Сохранить
        </SaveButton>
      </Form>
    </MainContainer>
  );
};
