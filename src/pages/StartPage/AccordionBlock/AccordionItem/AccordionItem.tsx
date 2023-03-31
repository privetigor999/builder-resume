import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { IAccordion } from "../../../../types/types";

const imgStyles = {
  color: "#0b61a4",
};

const typoStyles = {
  color: "#0b61a4",
  fontFamily: "Nunito",
};

const answerStyles = {
  fontFamily: "Nunito",
};

export const AccordionItem: React.FC<IAccordion> = ({
  id,
  question,
  answer,
}) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore sx={imgStyles} />}
        aria-controls={id}
        id={id}
      >
        <Typography sx={typoStyles}>{question}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={answerStyles}>{answer}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};
