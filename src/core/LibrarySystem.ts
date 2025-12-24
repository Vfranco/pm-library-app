import { BookService } from "./services/BookService";
import { StudentService } from "./services/StudentService";
import { LoanService } from "./services/LoanService";
import { LoanValidator } from "./validators/LoanValidator";
import { Loan } from "./entities/Loan";

export class LibrarySystem {
    constructor(
        public readonly books: BookService,
        public readonly students: StudentService,
        public readonly loans: LoanService,
        private loanValidator: LoanValidator
    ) { }

    loanBook(studentId: string, bookId: string): Loan {
        const student = this.students.getById(studentId);
        const book = this.books.getById(bookId);

        this.loanValidator.validateLoanData(student, book);

        this.books.markAsUnavailable(book!);

        return this.loans.createLoan(studentId, bookId);
    }

    returnBook(loanId: string): void {
        const loan = this.loans.getById(loanId);
        if (!loan) {
            throw new Error("Préstamo no encontrado");
        }

        this.loans.returnLoan(loanId);

        const book = this.books.getById(loan.bookId);
        if (book) {
            this.books.markAsAvailable(book);
        }
    }
}