import { Book } from "../entities/Book";
import { Student } from "../entities/Student";
import { Loan } from "../entities/Loan";
export interface View {
    showMessage(message: string): void;
    showBookList(books: Book[]): void;
    showStudentList(students: Student[]): void;
    showLoanList(loans: Loan[]): void;
}
