import { Book } from "../entities/Book";
import { Loan } from "../entities/Loan";
import { Student } from "../entities/Student";
import { Repository } from "../interfaces/Repository";
import { LoanValidator } from "./ValidateLoan";

export class LibrarySystem {
    constructor(
        private books: Repository<Book>,
        private students: Repository<Student>,
        private loans: Repository<Loan>
    ) { }

    registerBook(title: string, author: string) {
        const book: Book = {
            id: crypto.randomUUID(),
            title,
            author,
            available: true
        };

        this.books.save(book);
        return book;
    }

    deleteBook(id: string) {
        this.books.delete(id);
    }

    registerStudent(name: string) {
        const student: Student = {
            id: crypto.randomUUID(),
            name
        };

        this.students.save(student);
        return student;
    }

    deleteStudent(id: string) {
        this.students.delete(id);
    }

    loanBook(studentId: string, bookId: string) {
        const student = this.students.getById(studentId);
        const book = this.books.getById(bookId);

        LoanValidator.validateLoan(student, book);

        book!.available = false;
        this.books.update(book!);

        const loan = new Loan(
            crypto.randomUUID(),
            studentId,
            bookId,
            new Date()
        );

        this.loans.save(loan);
        return loan;
    }

    getAllBooks() {
        return this.books.getAll();
    }

    getAllStudents() {
        return this.students.getAll();
    }
}
