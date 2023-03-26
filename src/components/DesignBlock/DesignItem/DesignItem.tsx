import React from "react";
import { FormControlLabel, Radio } from "@mui/material";

import "./designItem.scss";

export const DesignItem: React.FC<any> = ({ id, value, label, img }) => {
  return (
    <FormControlLabel
      sx={{
        width: "100%",
        height: "300px",
        display: "flex",
        justifyContent: "space-around",
      }}
      value={value}
      control={<Radio />}
      label={
        <div className="designItem__block">
          <div className="designItem__example">
            <img src={img} style={{ width: "100%", height: "100%" }} />
          </div>
        </div>
      }
    />
  );
};
