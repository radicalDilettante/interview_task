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
    baseSalary: undefined,
    baseSalaryPeriod: "year",
    secondBaseSalary: undefined,
    secondBaseSalaryPeriod: "year",
    hasOtherIncome: false,
    otherIncome: [undefined],
    otherIncomePeriod: ["year"],
    hasLoan: false,
    loans: [undefined],
    hasCreditCard: false,
    creditCards: [undefined],
    deposit: undefined,
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
      <Head>
        <title>Calculator</title>
        <meta name="author" content="Wayne Choi" />
        <meta name="description" content="Caculator for home loan" />
        <meta
          name="keywords"
          content="motage, home loan, loan, bank, property, calculator"
        />
      </Head>

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
