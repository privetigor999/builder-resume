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
import { extraBlockSchema } from "../../utils/schema/extraBlockSchema";
import { Category } from "../Category/Category";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import { SaveButton } from "../SaveButton/SaveButton";

export const ExtraInfoBlock: React.FC<IBlockProps> = ({ id }) => {
  const [isFullfiled, setIsFullfiled] = React.useState<boolean>(false);

  const data = useAppSelector((state) => state.resumeData.data);
  const prevData = data?.extraBlock;
  const { userId } = useAuth();
  const dispatch = useAppDispatch();

  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(extraBlockSchema),
  });

  const onSubmit = async () => {
    const values = getValues();
    try {
      setIsFullfiled(true);
      await setDoc(doc(db, "resume", userId), {
        ...data,
        extraBlock: { ...values, blockId: id },
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
        <Category title="Дополнительная информация" icon="extra">
          <Input
            {...register("information")}
            id="extraInfo"
            label="Напишите, что считаете нужным"
            error={!!errors?.information}
            helperText={errors?.information?.message}
            defaultValue={prevData?.information}
            multiline
            minRows={4}
            required
          />
        </Category>
        <SaveButton title="Информация сохранена" isFullfiled={isFullfiled}>
          Сохранить
        </SaveButton>
      </Form>
    </MainContainer>
  );
};
