import React from "react";

import "./form.scss";

interface IFormProps {
  children: React.ReactNode;
  props?: any;
}

export const Form: React.FC<any> = ({ children, ...props }) => {
  return (
    <form className="form" {...props} noValidate>
      {children}
    </form>
  );
};
