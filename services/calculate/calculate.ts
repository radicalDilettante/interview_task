export type FinStatus = {
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
    const totalIncome: number = value.hasPartner
      ? value.baseSalary + value.secondBaseSalary
      : value.baseSalary;
    const totalOtherIncome: number = value.hasOtherIncome
      ? this.sum(value.otherIncome)
      : 0;
    return totalIncome + totalOtherIncome;
  }
  public getTotalLiabilities(value: FinStatus) {
    const loans = this.getTotalLoan(value);
    const creditCards = this.getTotalCreditCards(value);
    return loans + creditCards;
  }

  public getTotalLoan(value: FinStatus) {
    return value.hasLoan ? this.sum(value.loans) : 0;
  }

  public getTotalCreditCards(value: FinStatus) {
    return value.hasCreditCard ? this.sum(value.creditCards) : 0;
  }

  private sum(arr: number[]) {
    return arr.reduce((a, b) => a + b);
  }
}
