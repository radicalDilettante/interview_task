import React, { useEffect, useState } from "react";
import ToggleButtonItem from "../toggle_button_item/toggle_button_item";
import styles from "./toggle_button.module.css";

interface IProps {
  name: string;
  value: boolean;
  desc: string;
  trueStatus: string;
  falseStatus: string;
  onChange: (name: string, checked: boolean) => void;
}

export default function ToggleButton({
  name,
  value,
  desc,
  trueStatus,
  falseStatus,
  onChange,
}: IProps) {
  const [checked, setChecked] = useState<boolean>(value);

  useEffect(() => {
    onChange(name, checked);
  }, [checked]);

  const FalseButton = () => (
    <ToggleButtonItem
      status={falseStatus}
      keyValue={false}
      currentValue={checked}
      setValue={setChecked}
    />
  );

  const TrueButton = () => (
    <ToggleButtonItem
      status={trueStatus}
      keyValue={true}
      currentValue={checked}
      setValue={setChecked}
    />
  );

  return (
    <div>
      <p>{desc}</p>
      <div className={styles.switch}>
        {name === "hasPartner" ? (
          <>
            <FalseButton />
            <TrueButton />
          </>
        ) : (
          <>
            <TrueButton />
            <FalseButton />
          </>
        )}
      </div>
    </div>
  );
}
