import CalculateService, { FinStatus } from "./calculate";
describe("CalculateService", () => {
  let calculate: CalculateService;
  let value: FinStatus;

  beforeAll(() => {
    global.fetch = jest.fn().mockImplementation(() => {
      return new Promise((resolve, reject) => {
        resolve({
          json: () => {
            return {};
          },
        });
      });
    });
    calculate = new CalculateService("");
    value = {
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
  });

  describe("sendRequest", () => {
    it("sned a request", () => {
      expect(calculate.sendRequest(value)).toBeCalled;
    });
  });

  describe("getTotalIncome", () => {
    it("takes weekly income", () => {
      value.hasPartner = true;
      value.baseSalary = 1000;
      value.baseSalaryPeriod = "week";
      value.secondBaseSalary = 1200;
      value.secondBaseSalaryPeriod = "week";
      value.hasOtherIncome = true;
      value.otherIncome = [100, 200];
      value.otherIncomePeriod = ["week", "week"];

      expect(calculate.getTotalIncome(value)).toBe(130000);
    });

    it("takes yearly income", () => {
      value.hasPartner = true;
      value.baseSalary = 100000;
      value.baseSalaryPeriod = "year";
      value.secondBaseSalary = 100000;
      value.secondBaseSalaryPeriod = "year";
      value.hasOtherIncome = true;
      value.otherIncome = [10000, 5000];
      value.otherIncomePeriod = ["year", "year"];

      expect(calculate.getTotalIncome(value)).toBe(215000);
    });

    it("takes without partner and other income", () => {
      value.hasPartner = false;
      value.baseSalary = 100000;
      value.baseSalaryPeriod = "year";
      value.secondBaseSalary = 100000;
      value.secondBaseSalaryPeriod = "year";
      value.hasOtherIncome = false;
      value.otherIncome = [10000, 5000];
      value.otherIncomePeriod = ["year", "year"];

      expect(calculate.getTotalIncome(value)).toBe(100000);
    });
  });

  describe("getTotalLiabilities", () => {
    it("takes total liabilities", () => {
      value.hasCreditCard = true;
      value.creditCards = [100, 200];
      value.hasLoan = true;
      value.loans = [200000, 80000];

      expect(calculate.getTotalLiabilities(value)).toBe(280300);
    });

    it("takes without liabilities", () => {
      value.hasCreditCard = false;
      value.creditCards = [100, 200];
      value.hasLoan = false;
      value.loans = [200000, 80000];

      expect(calculate.getTotalLiabilities(value)).toBe(0);
    });
  });

  describe("getTotalLoans", () => {
    it("takes total loans", () => {
      value.hasLoan = true;
      value.loans = [200000, 80000];

      expect(calculate.getTotalLoans(value)).toBe(280000);
    });

    it("takes without loans", () => {
      value.hasLoan = false;
      value.loans = [200000, 80000];

      expect(calculate.getTotalLoans(value)).toBe(0);
    });
  });

  describe("getTotalCreditCards", () => {
    it("takes total credit cards", () => {
      value.hasCreditCard = true;
      value.creditCards = [100, 200];

      expect(calculate.getTotalCreditCards(value)).toBe(300);
    });

    it("takes without credit cards", () => {
      value.hasCreditCard = false;
      value.creditCards = [100, 200];

      expect(calculate.getTotalCreditCards(value)).toBe(0);
    });
  });
});
