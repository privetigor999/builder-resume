import { RadioGroup } from "@mui/material";
import React from "react";
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
      await setDoc(doc(db, "resume", userId), {
        ...data,
        design: { designName: value, blockId: id },
      });
      animatedScroll();
      dispatch(fetchResume());
    } catch (error) {
      console.log(error);
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
        <SaveButton title="Выбор дизайна сохранен" isFullfiled={true}>
          Сохранить
        </SaveButton>
      </Form>
    </MainContainer>
  );
};
