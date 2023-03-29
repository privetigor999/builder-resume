import React from "react";
import { AddAPhoto, Delete, Sync } from "@mui/icons-material";
import { Button, Snackbar, Alert, Slide } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { MainContainer } from "../../layouts/MainContainer/MainContainer";
import { Category } from "../Category/Category";
import { Form } from "../Form/Form";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "./../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import {
  deleteBlockResume,
  fetchResume,
} from "../../store/resumeData/resumeActions";
import { useAuth } from "../../hooks/useAuth";
import { IBlockProps } from "../../types/types";
import { TransitionProps } from "@mui/material/transitions";
import { CircularProgressWithLabel } from "./../CircularProgressWithLabel/CircularProgressWithLabel";

import "./photoBlock.scss";

export const PhotoBlock: React.FC<IBlockProps> = ({ id }) => {
  const [isFullfiled, setIsFullfiled] = React.useState<boolean>(false);
  const [selectedFile, setSelectedFile] = React.useState<any>(null);
  const [uploadPercentage, setUploadPercentage] = React.useState<null | number>(
    null
  );
  const [isShowSnackbar, setIsShowSnackbar] = React.useState(false);

  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.resumeData.data);
  const imgUrl = data?.photo?.imgUrl;
  const { userId } = useAuth();
  const uploading = uploadPercentage !== null && uploadPercentage < 100;
  const [transition, setTransition] = React.useState<
    React.ComponentType<TransitionProps> | undefined
  >(undefined);

  const callSlide = (Transition: React.ComponentType<TransitionProps>) => {
    setTransition(() => Transition);
    setIsShowSnackbar(true);
  };

  const closeSnackbarHandler = () => {
    setIsShowSnackbar(false);
  };

  React.useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + "-build-resume";

      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadPercentage(progress);
        },

        (error) => {
          console.log(error);
          setIsFullfiled(false);
        },

        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await setDoc(doc(db, "resume", userId), {
              ...data,
              photo: {
                blockId: id,
                imgUrl: downloadURL,
              },
            });
            dispatch(fetchResume());
            callSlide(TransitionLeft);
            setIsFullfiled(true);
          } catch (error) {
            console.log(error);
            setIsFullfiled(false);
          }
        }
      );
    };

    selectedFile && uploadFile();
  }, [selectedFile]);

  const { handleSubmit } = useForm({
    mode: "onBlur",
  });

  const removeIconHandler = (): void => {
    dispatch(deleteBlockResume());
  };

  const handleAddPhoto = () => {
    dispatch(fetchResume());
  };

  return (
    <MainContainer>
      <Form onSubmit={handleSubmit(handleAddPhoto)}>
        <Category title="Фотография" icon="photo">
          {uploading && (
            <div className="photoBlock__loader">
              <CircularProgressWithLabel value={uploadPercentage} size={70} />
            </div>
          )}
          {imgUrl && !uploading && (
            <img className="photoBlock__photo" src={imgUrl} alt="photo" />
          )}
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
              endIcon={imgUrl ? <Sync /> : <AddAPhoto />}
              disabled={uploading}
              sx={{ width: "60%" }}
            >
              {imgUrl ? "Загрузить другую фотографию" : "Загрузить фотографию"}
            </Button>
          </label>
        </Category>
        {imgUrl && !uploading && (
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
        )}
      </Form>
      <Snackbar
        open={isShowSnackbar}
        onClose={closeSnackbarHandler}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={2000}
        TransitionComponent={transition}
      >
        <Alert
          onClose={closeSnackbarHandler}
          severity={isFullfiled ? "success" : "error"}
        >
          {isFullfiled
            ? "Ваша фотография обновлена"
            : "Ваша фотография удалена"}
        </Alert>
      </Snackbar>
    </MainContainer>
  );
};

function TransitionLeft(props: TransitionProps) {
  //@ts-ignore
  return <Slide {...props} direction="left" />;
}
