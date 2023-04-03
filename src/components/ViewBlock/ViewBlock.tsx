import React from "react";
import { HexColorPicker } from "react-colorful";
import { useAppSelector } from "../../hooks/redux-hooks";
import { MainContainer } from "../../layouts/MainContainer/MainContainer";
import { Standart } from "./Standart/Standart";
import { useReactToPrint } from "react-to-print";
import { HalfResume } from "./HalfResume/HalfResume";

import "./viewBlock.scss";

export const ViewBlock = () => {
  const resume = useAppSelector((state) => state.resumeData.data);
  const design = resume?.design?.designName;
  const [color, setColor] = React.useState("#c2c2c2");
  const [isShow, setIsShow] = React.useState(false);

  const componentRef = React.useRef<React.ReactInstance | null>(null);
  const handlePrintClick = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <MainContainer>
      <header className="viewBlock__header">
        <div className="viewBlock__block">
          <button
            className="viewBlock__button"
            onClick={() => setIsShow((prev) => (prev = !prev))}
          >
            🎨 {isShow ? "Скрыть палитру" : "Выбрать цвет"}
          </button>
          {isShow && (
            <div className="viewBlock__colors">
              <HexColorPicker color={color} onChange={setColor} />
            </div>
          )}
        </div>
        <div className="viewBlock__block" onClick={handlePrintClick}>
          <button className="viewBlock__button">Скачать / печать резюме</button>
        </div>
      </header>
      <div
        style={{
          overflow: "scroll",
          marginTop: "-100px",
          minHeight: "1200px",
        }}
        ref={componentRef}
      >
        {(design === undefined || design === "standart") && (
          <Standart color={color} />
        )}
        {design === "half" && <HalfResume color={color} />}
      </div>
    </MainContainer>
  );
};
