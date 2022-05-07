type period = "year" | "week";

export type FinStatus = {
  hasPartner: boolean;
  baseSalary: number;
  baseSalaryPeriod: period;
  secondBaseSalary: number;
  secondBaseSalaryPeriod: period;
  hasOtherIncome: boolean;
  otherIncome: number[];
  otherIncomePeriod: period[];
  hasLoan: boolean;
  loans: number[];
  hasCreditCard: boolean;
  creditCards: number[];
  deposit: number;
};

export type Response = {
  borrowing: number;
  property_price: number;
};

export default class CalculateService {
  private apiEndpoint: string;

  constructor(apiEndpoint: string) {
    this.apiEndpoint = apiEndpoint;
  }

  public sendRequest = async (value: FinStatus) => {
    const response = await fetch(this.apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        total_income: this.getTotalIncome(value),
        total_liabilities: this.getTotalLiabilities(value),
        deposit: value.deposit,
      }),
    });
    return await response.json();
  };

  public getTotalIncome(value: FinStatus) {
    const baseSalary =
      value.baseSalaryPeriod === "year"
        ? value.baseSalary
        : value.baseSalary * 52;
    const secondBaseSalary =
      value.secondBaseSalaryPeriod === "year"
        ? value.secondBaseSalary
        : value.secondBaseSalary * 52;
    const totalBaseSalary: number = value.hasPartner
      ? baseSalary + secondBaseSalary
      : baseSalary;

    let totalOtherIncome: number = 0;
    if (value.hasOtherIncome) {
      for (let i = 0; i < value.otherIncome.length; i++) {
        const income =
          value.otherIncomePeriod[i] === "year"
            ? value.otherIncome[i]
            : value.otherIncome[i] * 52;
        totalOtherIncome += income;
      }
    }

    return totalBaseSalary + totalOtherIncome;
  }

  public getTotalLiabilities(value: FinStatus) {
    const loans = this.getTotalLoans(value);
    const creditCards = this.getTotalCreditCards(value);
    return loans + creditCards;
  }

  public getTotalLoans(value: FinStatus) {
    return value.hasLoan ? this.sum(value.loans) : 0;
  }

  public getTotalCreditCards(value: FinStatus) {
    return value.hasCreditCard ? this.sum(value.creditCards) : 0;
  }

  private sum(arr: number[]) {
    return arr.length > 0 ? arr.reduce((a, b) => a + b) : 0;
  }
}
