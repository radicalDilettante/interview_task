import CalculateService, {
  FinStatus,
  Response,
} from "@/services/calculate/calculate";
import React from "react";
import styles from "./result.module.css";

interface IProps {
  response?: Response;
  values: FinStatus;
  calculate: CalculateService;
}

export default function Result({ response, values, calculate }: IProps) {
  const borrowing = response?.borrowing.toLocaleString("en-NZ");

  return (
    <div className={styles.container}>
      <div className={styles.borrowing}>
        <p>Here&apos;s what you can borrow</p>
        <b>${parseInt(borrowing!) > 0 ? borrowing : 0}</b>
      </div>

      {values.deposit && (
        <div className={styles.others}>
          With your deposit of ${values.deposit.toLocaleString("en-NZ")} you
          could afford a property up to $
          {response?.property_price.toLocaleString("en-NZ")}
        </div>
      )}

      <div className={styles.others}>
        <p>Total income</p>
        <p>${calculate.getTotalIncome(values).toLocaleString("en-NZ")}</p>
      </div>

      {values.hasLoan && (
        <div className={styles.others}>
          <p>Total loans</p>
          <p>${calculate.getTotalLoans(values).toLocaleString("en-NZ")}</p>
        </div>
      )}

      {values.hasCreditCard && (
        <div className={styles.others}>
          <p>Total creditcards</p>
          <p>
            ${calculate.getTotalCreditCards(values).toLocaleString("en-NZ")}
          </p>
        </div>
      )}
    </div>
  );
}
