import { ChangeEvent, useEffect, useState } from "react";

interface IUseForm<Status> {
  initialValues: Status;
  sendRequest: Function;
}

function useForm<Status, Response>({
  initialValues,
  sendRequest,
}: IUseForm<Status>) {
  const [values, setValues] = useState<Status>(initialValues);
  const [response, setResponse] = useState<Response>();

  const handleChangeNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: parseInt(value) });
  };

  const setValue = (name: string, value: boolean | number[]) => {
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    const fetchData = async (values: Status) => {
      setResponse(await sendRequest(values));
    };
    fetchData(values);
  }, [values]);

  return {
    values,
    handleChangeNumber,
    setValue,
    response,
  };
}

export default useForm;
