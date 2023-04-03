import React from "react";
import { AccountCircle } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { useAuth } from "../../hooks/useAuth";
import { removeUser } from "../../store/userSlice/userReducer";
import { removeData } from "../../store/resumeData/resumeReducer";

import "./header.scss";
import { setCurrentTab } from "../../store/tabSlice/tabSlice";

export const Header: React.FC = () => {
  const [isShowMenu, setIsShowMenu] = React.useState<null | HTMLElement>(null);

  const { isAuth } = useAuth();
  const dispatch = useAppDispatch();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setIsShowMenu(event.currentTarget);
  };

  const handlerLogout = () => {
    dispatch(removeUser());
    dispatch(removeData());
    dispatch(setCurrentTab(1));
    setIsShowMenu(null);
  };

  return (
    <header className="header">
      <nav className="header__nav">
        <ul className="header__list">
          <li className="header__item">
            <Link to="/" className="header__link">
              Главная
            </Link>
          </li>
          <li className="header__item">
            <Link to="/about" className="header__link">
              О нас
            </Link>
          </li>
        </ul>
        <div className="header__right">
          <Link to="/resume" className="header__createBtn"></Link>
          {isAuth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{
                  "@media (min-width: 768px)": {
                    marginLeft: "20px",
                  },
                }}
              >
                <AccountCircle style={{ color: "#ffffff" }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={isShowMenu}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(isShowMenu)}
                onClose={() => setIsShowMenu(null)}
              >
                <MenuItem onClick={handlerLogout}>Выйти</MenuItem>
              </Menu>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
