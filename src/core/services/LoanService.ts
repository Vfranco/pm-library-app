import { Loan } from "../entities/Loan";
import { Repository } from "../interfaces/Repository";
import { IdGenerator } from "../interfaces/IdGenerator";
import { DateProvider } from "../interfaces/DateProvider";

export class LoanService {
  static readonly entityName = "loans";

  constructor(
    private repository: Repository<Loan>,
    private idGenerator: IdGenerator,
    private dateProvider: DateProvider,
  ) {}

  createLoan(studentId: string, bookId: string): Loan {
    const loan = new Loan(
      this.idGenerator.generate(),
      studentId,
      bookId,
      this.dateProvider.now(),
      false,
    );

    this.repository.save(loan);
    return loan;
  }

  returnLoan(loanId: string): Loan {
    const loan = this.repository.getById(loanId);
    if (!loan) {
      throw new Error("Préstamo no encontrado");
    }
    if (loan.returned) {
      throw new Error("El préstamo ya fue devuelto");
    }

    loan.returned = true;
    this.repository.update(loan);

    return loan;
  }

  getAll(): Loan[] {
    return this.repository.getAll();
  }

  getById(id: string): Loan | null {
    return this.repository.getById(id);
  }

  delete(id: string): void {
    const loan = this.repository.getById(id);
    if (!loan) {
      throw new Error("Préstamo no encontrado");
    }
    this.repository.delete(id);
  }

  getActiveLoansByStudent(studentId: string): Loan[] {
    return this.repository
      .getAll()
      .filter((loan) => loan.studentId === studentId && !loan.returned);
  }
}
