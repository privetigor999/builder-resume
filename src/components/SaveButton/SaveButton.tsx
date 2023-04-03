import React from "react";
import { Button, Snackbar, Alert, Slide } from "@mui/material";
import { Done } from "@mui/icons-material/";
import { TransitionProps } from "@mui/material/transitions";

interface SaveButtonProps {
  children: React.ReactNode;
  title: string;
  isFulfilled?: boolean;
  color?: "primary" | "success";
  errorMes?: string;
  withIcon?: boolean;
  props?: any;
  fullWidth?: boolean;
  width?: string;
}

export const SaveButton: React.FC<SaveButtonProps> = ({
  children,
  title,
  isFulfilled,
  width,
  fullWidth = false,
  withIcon = true,
  errorMes = "Заполните все обязательные поля",
  color = "success",
  props,
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
        color={color}
        type="submit"
        variant="contained"
        endIcon={withIcon && <Done />}
        sx={{
          width: `${width || fullWidth ? "100%" : "80%"}`,
          "@media (min-width: 786px)": {
            width: `${width || "700px"}`,
          },
          marginBottom: "20px",
        }}
        onClick={() => clickSaveBtn(TransitionLeft)}
        {...props}
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
          severity={isFulfilled ? "success" : "error"}
        >
          {isFulfilled ? title : errorMes}
        </Alert>
      </Snackbar>
    </>
  );
};

function TransitionLeft(props: TransitionProps) {
  //@ts-ignore
  return <Slide {...props} direction="left" />;
}
