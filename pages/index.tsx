import Head from "next/head";
import styles from "@/styles/index.module.css";
import useForm from "@/hooks/use_form/use_form";
import Form from "@/components/form/form";
import CalculateService, {
  FinStatus,
  Response,
} from "@/services/calculate/calculate";
import Result from "@/components/result/result";

interface IProps {
  calculate: CalculateService;
}

export default function Home({ calculate }: IProps) {
  const initialValues: FinStatus = {
    hasPartner: false,
    baseSalary: 0,
    baseSalaryPeriod: "year",
    secondBaseSalary: 0,
    secondBaseSalaryPeriod: "year",
    hasOtherIncome: false,
    otherIncome: [0],
    otherIncomePeriod: ["year"],
    hasLoan: false,
    loans: [0],
    hasCreditCard: false,
    creditCards: [0],
    deposit: 0,
  };

  const {
    values,
    handleChangeNumber,
    handleChangeSelector,
    setValue,
    response,
  } = useForm<FinStatus, Response>({
    initialValues,
    sendRequest: calculate.sendRequest,
  });

  return (
    <div className={styles.container}>
      <section className={styles.form}>
        <Form
          values={values}
          handleChangeNumber={handleChangeNumber}
          setValue={setValue}
          handleChangeSelector={handleChangeSelector}
        />
      </section>
      <section className={styles.result}>
        <Result response={response} values={values} calculate={calculate} />
      </section>
    </div>
  );
}
