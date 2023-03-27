import React from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { MobileWarning } from "../../components/MobileWarning/MobileWarning";
import { MainContainer } from "../../layouts/MainContainer/MainContainer";
import { Login } from "./Login/Login";
import { SignUp } from "./SignUp/SignUp";
import { useLottie } from "lottie-react";

import safetyIcon from "./../../assets/lottie/safety.json";

const style = {
  height: 200,
  marginTop: 100,
};

const options = {
  animationData: safetyIcon,
  loop: false,
  autoplay: true,
};

export const AuthPage = () => {
  const [tab, setTab] = React.useState<number>(0);
  const { View } = useLottie(options, style);

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
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "60%",
              height: "100%",
              marginTop: "140px",
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
              sx={{ marginBottom: "30px" }}
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
              width: "30%",
            }}
          >
            <Box>{View}</Box>
            <Typography sx={{ textAlign: "center" }} paragraph>
              Мы гарантируем безопасность ваших данных. Для хранения мы
              используем Google FireBase.
            </Typography>
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
