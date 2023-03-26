import { AddAPhoto, Delete, Sync } from "@mui/icons-material";
import Button from "@mui/material/Button";
import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { MainContainer } from "../../layouts/MainContainer/MainContainer";
import {
  clearBlockResume,
  updateResume,
} from "../../store/resumeTab/resumeTabReducer";
import { animatedScroll } from "../../utils/animatedScroll";
import { Category } from "../Category/Category";
import { Form } from "../Form/Form";
import { SaveButton } from "../SaveButton/SaveButton";

import "./photoBlock.scss";

export const PhotoBlock: React.FC = () => {
  const { photo } = useAppSelector((state) => state.resumeTab.resume);

  const [selectedFile, setSelectedFile] = React.useState(null);
  const [preview, setPreview] = React.useState(null);

  const dispatch = useAppDispatch();

  const { handleSubmit } = useForm({
    mode: "onBlur",
  });

  React.useEffect(() => {
    if (selectedFile) {
      const objUrl = URL.createObjectURL(selectedFile);
      setPreview(objUrl);
    }
  }, [selectedFile]);

  React.useEffect(() => {
    if (photo) {
      setPreview(photo);
    }
  }, []);

  const onSubmit = () => {
    dispatch(updateResume({ photo: preview }));
    animatedScroll();
    console.log(preview);
  };

  const removeIconHandler = (): void => {
    setPreview(null);
    dispatch(updateResume({ photo: null }));
    dispatch(clearBlockResume(2));
  };
  return (
    <MainContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Category title="Фотография" icon="photo">
          {preview && <img className="photoBlock__photo" src={preview} />}
          <label
            htmlFor="upload-photo"
            style={{ width: "100%" }}
            className="photoBlock__label"
          >
            <input
              style={{ display: "none" }}
              id="upload-photo"
              name="upload-photo"
              value=""
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSelectedFile(e.target.files[0])
              }
              accept="image/png, image/jpeg"
              type="file"
            />

            <Button
              color="primary"
              variant="contained"
              component="span"
              endIcon={preview ? <Sync /> : <AddAPhoto />}
              sx={{ width: "60%" }}
            >
              {preview ? "Обновить фотографию" : "Загрузить фотографию"}
            </Button>
          </label>
        </Category>
        {!!preview && (
          <>
            <SaveButton title="Ваша фотография обновлена" isFullfiled={true}>
              Сохранить
            </SaveButton>
            <Button
              color="error"
              variant="contained"
              component="span"
              endIcon={<Delete />}
              onClick={removeIconHandler}
              sx={{ width: "60%" }}
            >
              Удалить фотографию
            </Button>
          </>
        )}
      </Form>
    </MainContainer>
  );
};
