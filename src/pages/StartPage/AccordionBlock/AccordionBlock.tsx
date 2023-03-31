import React from "react";
import { AccordionItem } from "./AccordionItem/AccordionItem";
import { accordions } from "../../../utils/data";

import "./accordion.scss";

import { IAccordion } from "../../../types/types";

export const AccordionBlock: React.FC = () => {
  return (
    <div className="accordion">
      <h5>Вопрос - ответ</h5>
      {accordions.map((accord: IAccordion) => (
        <AccordionItem key={accord.id} {...accord} />
      ))}
    </div>
  );
};
