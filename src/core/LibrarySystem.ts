import { BookService } from "./services/BookService";
import { StudentService } from "./services/StudentService";
import { LoanService } from "./services/LoanService";

export class LibrarySystem {
    constructor(
        public readonly books: BookService,
        public readonly students: StudentService,
        public readonly loans: LoanService
    ) { }

    loanBook(studentId: string, bookId: string) {
        const student = this.students.getById(studentId);
        const book = this.books.getById(bookId);

        this.loans.validateLoan(student, book);

        this.books.markAsUnavailable(book!);
        return this.loans.createLoan(studentId, bookId);
    }
}
