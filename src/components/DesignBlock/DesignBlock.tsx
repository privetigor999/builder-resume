import React from "react";
import { RadioGroup } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { MainContainer } from "../../layouts/MainContainer/MainContainer";
import { animatedScroll } from "../../utils/animatedScroll";
import { Form } from "../Form/Form";
import { SaveButton } from "../SaveButton/SaveButton";
import { DesignItem } from "./DesignItem/DesignItem";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { IBlockProps } from "../../types/types";
import { useAuth } from "../../hooks/useAuth";
import { fetchResume } from "../../store/resumeData/resumeActions";
import { designItems } from "../../utils/data";
import { showFetchError } from "../../utils/helpers/showFetchError";

export const DesignBlock: React.FC<IBlockProps> = ({ id }) => {
  const data = useAppSelector((state) => state.resumeData.data);
  const prevData = data?.design;

  const [value, setValue] = React.useState(prevData?.designName || "standart");
  const { userId } = useAuth();
  const dispatch = useAppDispatch();

  const { handleSubmit } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async () => {
    try {
      const dataToUpdate = {
        ...data,
        design: { designName: value, blockId: id },
      };
      await setDoc(doc(db, "resume", userId), dataToUpdate);
      animatedScroll();
      dispatch(fetchResume());
    } catch (error) {
      showFetchError(onSubmit);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <MainContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <RadioGroup
          aria-labelledby="design-resume"
          value={value}
          name="design-resume"
          onChange={handleChange}
          sx={{
            width: "100%",
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {designItems.map((design) => (
            <DesignItem key={design.id} {...design} />
          ))}
        </RadioGroup>
        <SaveButton title="Выбор дизайна сохранен" isFulfilled={true}>
          Сохранить
        </SaveButton>
      </Form>
    </MainContainer>
  );
};
