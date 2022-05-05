import Head from "next/head";
import styles from "@/pages/index.module.css";
import useForm from "hooks/use_form/use_form";

type FinStatus = {
  hasPartner: boolean;
  baseSalary: number;
  secondBaseSalary: number;
  hasOtherIncome: boolean;
  otherIncome: number[];
  hasLoan: boolean;
  loans: number[];
  hasCreditCard: boolean;
  creditCards: number[];
  deposit: number;
};

export default function Home() {
  const initialValues: FinStatus = {
    hasPartner: false,
    baseSalary: 0,
    secondBaseSalary: 0,
    hasOtherIncome: false,
    otherIncome: [],
    hasLoan: false,
    loans: [],
    hasCreditCard: false,
    creditCards: [],
    deposit: 0,
  };

  const onSubmit = (values: FinStatus) => {};

  const { values, setValues, handleChange, submitHandle } = useForm<FinStatus>({
    initialValues,
    onSubmit,
  });

  return <div className={styles.container}></div>;
}
