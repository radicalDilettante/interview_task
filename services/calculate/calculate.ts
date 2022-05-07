type period = "year" | "week";

export type FinStatus = {
  hasPartner: boolean;
  baseSalary: number | undefined;
  baseSalaryPeriod: period;
  secondBaseSalary: number | undefined;
  secondBaseSalaryPeriod: period;
  hasOtherIncome: boolean;
  otherIncome: (number | undefined)[];
  otherIncomePeriod: period[];
  hasLoan: boolean;
  loans: (number | undefined)[];
  hasCreditCard: boolean;
  creditCards: (number | undefined)[];
  deposit: number | undefined;
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
    let baseSalary = value.baseSalary ? value.baseSalary : 0;
    let secondBaseSalary = value.secondBaseSalary ? value.secondBaseSalary : 0;

    baseSalary =
      value.baseSalaryPeriod === "year" ? baseSalary : baseSalary * 52;

    secondBaseSalary =
      value.secondBaseSalaryPeriod === "year"
        ? secondBaseSalary
        : secondBaseSalary * 52;

    const totalBaseSalary: number = value.hasPartner
      ? baseSalary + secondBaseSalary
      : baseSalary;

    let totalOtherIncome: number = 0;
    if (value.hasOtherIncome) {
      for (let i = 0; i < value.otherIncome.length; i++) {
        const incomeItem = value.otherIncome[i] ? value.otherIncome[i] : 0;

        const income =
          value.otherIncomePeriod[i] === "year" ? incomeItem : incomeItem! * 52;

        totalOtherIncome += income!;
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
    let totalLoan = 0;

    if (value.hasLoan) {
      value.loans.forEach((i) => {
        const loan = i ? i : 0;
        totalLoan += loan;
      });
    }

    return totalLoan;
  }

  public getTotalCreditCards(value: FinStatus) {
    let totalCreditCards = 0;

    if (value.hasCreditCard) {
      value.creditCards.forEach((i) => {
        const creditCard = i ? i : 0;
        totalCreditCards += creditCard;
      });
    }

    return totalCreditCards;
  }
}
