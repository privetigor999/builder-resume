import React from "react";
import { CarouselBlock } from "../../components/CarouselBlock/CarouselBlock";
import { MainContainer } from "../../layouts/MainContainer/MainContainer";
import { AccordionBlock } from "./AccordionBlock/AccordionBlock";
import { EmployeeList } from "./EmployeeList/EmployeeList";
import { Info } from "./Info/Info";

import "./startPage.scss";

export const StartPage: React.FC = () => {
  return (
    <div className="startPage">
      <div className="startPage__carousel">
        <CarouselBlock />
      </div>

      <Info
        title="Конструктор резюме"
        text="Составление резюме – сложная задача, требующая определённых знаний.
        Соискателю необходимо подумать не только над его содержимым, но и над
        оформлением. Также нужно продумать наличие всех важных блоков. Упростить
        задачу подготовки резюме поможет составленный нами сервис."
      />
      <EmployeeList />
      <Info
        title="Преимущества"
        text="Составить резюме онлайн и сохранить бесплатно вы можете с помощью нашего бесплатного конструктора резюме. Сервис предельно лёгок в освоении, с ним справится даже неподготовленный пользователь ПК, учитывая отсутствие трудоёмкой регистрации."
      />
      <AccordionBlock />
    </div>
  );
};
