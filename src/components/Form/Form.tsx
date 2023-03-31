import React from "react";

import "./form.scss";

interface IFormProps {
  children: React.ReactNode;
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  props?: any;
  width?: "fullWidth";
}

export const Form: React.FC<IFormProps> = ({ children, width, ...props }) => {
  const checkFullWidth = width && { width: "100%" };
  return (
    <form className="form" style={checkFullWidth} {...props} noValidate>
      {children}
    </form>
  );
};
