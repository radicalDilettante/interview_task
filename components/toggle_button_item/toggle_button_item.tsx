import React from "react";

interface IProps {
  status: string;
  keyValue: boolean;
  currentValue: boolean;
  setValue: Function;
}

export default function ToggleButtonItem({
  status,
  keyValue,
  currentValue,
  setValue,
}: IProps) {
  return (
    <div
      onClick={() => {
        setValue(keyValue);
      }}
    >
      {status}
    </div>
  );
}
