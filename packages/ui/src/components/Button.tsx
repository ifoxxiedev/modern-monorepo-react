import React, { FC, ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {};

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className="text-white p-2 bg-green-500 " {...props}>
      {children}
    </button>
  );
};
