import React from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { MobileWarning } from "../../components/MobileWarning/MobileWarning";
import { MainContainer } from "../../layouts/MainContainer/MainContainer";
import { Login } from "./Login/Login";
import { SignUp } from "./SignUp/SignUp";
import { useLottie } from "lottie-react";

import loginLottie from "./../../assets/lottie/login.json";
import safetyLottie from "./../../assets/lottie/safety.json";

const style = {
  height: 200,
};

const style2 = {
  height: 200,
};

const options = {
  animationData: loginLottie,
  autoplay: true,
};

const options2 = {
  animationData: safetyLottie,
  loop: false,
  autoplay: true,
};

export const AuthPage = () => {
  const [tab, setTab] = React.useState<number>(0);
  const { View } = useLottie(options, style);
  const SafetyView = useLottie(options2, style2).View;

  const handleChange = (
    e: React.SyntheticEvent<Element, Event>,
    newTab: number
  ) => {
    setTab(newTab);
  };

  return (
    <>
      <MainContainer>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "80px",
            }}
          >
            <Box
              sx={{
                width: "50%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Tabs
                value={tab}
                onChange={handleChange}
                aria-label="auth-tabs"
                variant="fullWidth"
                sx={{ marginBottom: "20px" }}
                centered
              >
                <Tab label={"Вход"} {...a11yProps(0)} />
                <Tab label={"Регистрация"} {...a11yProps(1)} />
              </Tabs>
              {tab === 0 && <Login />}
              {tab === 1 && <SignUp />}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "50%",
                marginLeft: "20px",
                backgroundColor: "rgba(208, 116, 116, 0.601)",
                borderRadius: "10px",
              }}
            >
              <Box>{View}</Box>
              <p style={{ textAlign: "center", padding: "0 10px 10px" }}>
                Для создания резюме вам нужно зайти в свой аккаунт или
                зарегистрироваться. Это поможет вам вернуться к редактированию
                своего резюме.
              </p>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              marginTop: "30px",
              backgroundColor: "#c0c0c0",
              borderRadius: "10px",
            }}
          >
            <Box>{SafetyView}</Box>
            <p
              style={{
                textAlign: "center",
                fontSize: 20,
                width: "60%",
                color: "#ffffff",
              }}
            >
              Мы гарантируем безопасность ваших данных. Для хранения данных мы
              используем Google FireBase.
            </p>
          </Box>
        </Box>
      </MainContainer>
      <MobileWarning />
    </>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
