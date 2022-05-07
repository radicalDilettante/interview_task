import type { NextApiRequest, NextApiResponse } from "next";
export default async function Calculate(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { total_income, total_liabilities, deposit } = req.body;

  const sanitize = (input: any) => {
    return input ? parseInt(input) : 0;
  };

  const response = await fetch(
    "https://react-dev-test-api.vercel.app/api/test",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        total_income: sanitize(total_income),
        total_liabilities: sanitize(total_liabilities),
        deposit: sanitize(deposit),
      }),
    }
  );

  res.status(200).json(await response.json());
}
