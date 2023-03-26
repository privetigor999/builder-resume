import React from "react";
import { Button, Snackbar, Alert, Slide } from "@mui/material";
import { Done } from "@mui/icons-material/";
import { TransitionProps } from "@mui/material/transitions";

interface SaveButtonProps {
  children: React.ReactNode;
  title: string;
  isFullfiled: boolean;
}

export const SaveButton: React.FC<SaveButtonProps> = ({
  children,
  title,
  isFullfiled,
}) => {
  const [isShowSnackbar, setIsShowSnackbar] = React.useState(false);

  const [transition, setTransition] = React.useState<
    React.ComponentType<TransitionProps> | undefined
  >(undefined);

  const clickSaveBtn = (Transition: React.ComponentType<TransitionProps>) => {
    setTransition(() => Transition);
    setIsShowSnackbar(true);
  };

  const closeSnackbarHandler = () => {
    setIsShowSnackbar(false);
  };

  return (
    <>
      <Button
        color="success"
        type="submit"
        variant="contained"
        endIcon={<Done />}
        sx={{ width: "60%", marginBottom: "20px" }}
        onClick={() => clickSaveBtn(TransitionLeft)}
      >
        {children}
      </Button>
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
          {isFullfiled ? title : "Заполните все обязательные поля"}
        </Alert>
      </Snackbar>
    </>
  );
};

function TransitionLeft(props: TransitionProps) {
  //@ts-ignore
  return <Slide {...props} direction="left" />;
}
