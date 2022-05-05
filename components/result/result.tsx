import CalculateService, {
  FinStatus,
  Response,
} from "@/services/calculate/calculate";
import React from "react";

interface IProps {
  response?: Response;
  values: FinStatus;
  calculate: CalculateService;
}
export default function Result({ response, values, calculate }: IProps) {
  return (
    <div>
      <p>Here&apos;s what you can borrow</p>
      <b>{response?.borrowing.toLocaleString("en-NZ")}</b>
      <p>Total income</p>
      <p>{calculate.getTotalIncome(values).toLocaleString("en-NZ")}</p>
      {values.deposit > 0 && (
        <p>
          With your deposit of ${values.deposit.toLocaleString("en-NZ")} you
          could afford a property up to $
          {response?.property_price.toLocaleString("en-NZ")}
        </p>
      )}
      {values.hasLoan && (
        <>
          <p>Total loans</p>
          <p>{calculate.getTotalLoan(values).toLocaleString("en-NZ")}</p>
        </>
      )}
      {values.hasCreditCard && (
        <>
          <p>Total creditcards</p>
          <p>{calculate.getTotalCreditCards(values).toLocaleString("en-NZ")}</p>
        </>
      )}
    </div>
  );
}
