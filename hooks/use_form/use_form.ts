import { ChangeEvent, useState } from "react";

interface IUseForm<Status> {
  initialValues: Status;
  onSubmit: (values: Status) => void;
}

function useForm<Status>({ initialValues, onSubmit }: IUseForm<Status>) {
  const [values, setValues] = useState<Status>(initialValues);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const submitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(values);
  };

  return {
    values,
    setValues,
    handleChange,
    submitHandle,
  };
}

export default useForm;
