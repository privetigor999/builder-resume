import React from "react";
import { Category } from "../Category/Category";
import { Form } from "../Form/Form";
import { Input } from "../Input/Input";
import { MainContainer } from "../../layouts/MainContainer/MainContainer";
import { SaveButton } from "../SaveButton/SaveButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { baseSchema } from "../../utils/schema/baseSchema";
import { animatedScroll } from "../../utils/animatedScroll";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./../../../firebase";
import { useAuth } from "../../hooks/useAuth";
import { fetchResume } from "../../store/resumeData/resumeActions";
import { IBase, IBlockProps } from "../../types/types";
import { showFetchError } from "../../utils/helpers/showFetchError";

export const BaseBlock: React.FC<IBlockProps> = ({ id }) => {
  const [isFulfilled, setIsFulfilled] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.resumeData.data);
  const prevData = data?.baseInfo;
  const { userId } = useAuth();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IBase>({
    mode: "onBlur",
    resolver: yupResolver(baseSchema),
  });

  const onSubmit = async () => {
    const values = getValues();
    try {
      setIsFulfilled(true);
      const dataToUpdate = { ...data, baseInfo: { ...values, blockId: id } };
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
        <Category title="Желаемая должность" icon="position">
          <Input
            {...register("position")}
            id="position"
            defaultValue={prevData?.position}
            label="Должность"
            error={!!errors.position}
            helperText={errors?.position?.message}
            required
          />
          <Input
            {...register("salary")}
            defaultValue={prevData?.salary}
            id="salary"
            label="Ожидания по зарплате"
          />
        </Category>

        <Category title="Имя и фамилия" icon="man">
          <Input
            {...register("name")}
            defaultValue={prevData?.name}
            id="name"
            label="Имя"
            error={!!errors.name}
            helperText={errors?.name?.message}
            required
          />
          <Input
            {...register("middlename")}
            defaultValue={prevData?.middlename}
            id="middlename"
            label="Отчество"
            error={!!errors.middlename}
            helperText={errors?.middlename?.message}
          />
          <Input
            {...register("surname")}
            defaultValue={prevData?.surname}
            id="surname"
            label="Фамилия"
            error={!!errors.surname}
            helperText={errors?.surname?.message}
            required
          />

          <Input
            {...register("dateBirthday")}
            defaultValue={prevData?.dateBirthday}
            id="dateBirthday"
            label="Дата Рождения"
            type="date"
            helperText={errors?.dateBirthday?.message}
            error={!!errors?.dateBirthday}
            required
          />
        </Category>
        <Category title="Телефон" icon="phone">
          <Input
            {...register("phone")}
            defaultValue={prevData?.phone}
            id="phone"
            label="Телефон"
            error={!!errors?.phone}
            helperText={errors?.phone?.message}
            required
          />
        </Category>
        <Category title="Контакты" icon="contact">
          <Input
            {...register("email")}
            defaultValue={prevData?.email}
            id="email"
            label="Почта"
            error={!!errors?.email}
            helperText={errors?.email?.message}
            required
          />
          <Input
            {...register("telegram")}
            defaultValue={prevData?.telegram}
            id="telegram"
            label="Telegram"
            error={!!errors?.telegram}
            helperText={errors?.telegram?.message}
          />
        </Category>

        <SaveButton isFulfilled={isFulfilled} title={"Данные о вас обновлены"}>
          Сохранить
        </SaveButton>
      </Form>
    </MainContainer>
  );
};
