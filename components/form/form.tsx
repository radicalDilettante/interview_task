import React, { ChangeEventHandler } from "react";
import NumberArr from "@/components/number_arr/number_arr";
import NumberInput from "@/components/number_input/number_input";
import ToggleButton from "@/components/toggle_button/toggle_button";
import { FinStatus } from "@/services/calculate/calculate";
import styles from "./form.module.css";

interface IProps {
  values: FinStatus;
  handleChangeNumber: ChangeEventHandler<HTMLInputElement>;
  setValue: (name: string, value: boolean | number[] | string[]) => void;
  handleChangeSelector: ChangeEventHandler<HTMLSelectElement>;
}

export default function Form({
  values,
  handleChangeNumber,
  setValue,
  handleChangeSelector,
}: IProps) {
  return (
    <form className={styles.container}>
      {/* salary */}
      <ToggleButton
        name="hasPartner"
        value={values.hasPartner}
        desc="How many of you are buying the property"
        trueStatus="I'm buying with someone"
        falseStatus="Just Me"
        onChange={setValue}
      />
      <NumberInput
        name="baseSalary"
        value={values.baseSalary}
        desc="What's your base salary/wages? (before tax)"
        onChange={handleChangeNumber}
        periodName="baseSalaryPeriod"
        onChangePeriod={handleChangeSelector}
      />
      {values.hasPartner && (
        <NumberInput
          name="secondBaseSalary"
          value={values.secondBaseSalary}
          desc="What's the second applicant's base salary/wages? (before tax)"
          onChange={handleChangeNumber}
          periodName="secondBaseSalaryPeriod"
          onChangePeriod={handleChangeSelector}
        />
      )}

      {/* other income */}
      <ToggleButton
        name="hasOtherIncome"
        value={values.hasOtherIncome}
        desc="Do you have another source of income?"
        trueStatus="Yes"
        falseStatus="No"
        onChange={setValue}
      />
      {values.hasOtherIncome && (
        <NumberArr
          name="otherIncome"
          value={values.otherIncome}
          desc="Other income"
          setValue={setValue}
          periodName="otherIncomePeriod"
          periodValue={values.otherIncomePeriod}
        />
      )}

      {/* Loan */}
      <ToggleButton
        name="hasLoan"
        value={values.hasLoan}
        desc="Do you have any loans?"
        trueStatus="Yes"
        falseStatus="No"
        onChange={setValue}
      />
      {values.hasLoan && (
        <NumberArr
          name="loans"
          value={values.loans}
          desc="Loan"
          setValue={setValue}
        />
      )}

      {/* Credit card */}
      <ToggleButton
        name="hasCreditCard"
        value={values.hasCreditCard}
        desc="Do you have any credit cards?"
        trueStatus="Yes"
        falseStatus="No"
        onChange={setValue}
      />
      {values.hasCreditCard && (
        <NumberArr
          name="creditCards"
          value={values.creditCards}
          desc="Credit Card"
          setValue={setValue}
        />
      )}

      {/* Deposit */}
      <NumberInput
        name="deposit"
        value={values.deposit}
        desc="How much deposit do you have?"
        onChange={handleChangeNumber}
      />
    </form>
  );
}
