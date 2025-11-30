import { Book } from "../entities/Book";
import { Loan } from "../entities/Loan";
import { Student } from "../entities/Student";
import { Repository } from "../interfaces/Repository";

export class LibrarySystem {
    constructor(
        private books: Repository<Book>,
        private students: Repository<Student>,
        private loans: Repository<Loan>
    ) { }

    registerBook(book: Book) {
        this.books.save(book);
    }

    registerStudent(student: Student) {
        this.students.save(student);
    }

    loanBook(studentId: string, bookId: string) {
        const student = this.students.getById(studentId);
        const book = this.books.getById(bookId);

        if (!student) throw new Error("Estudiante no existe");
        if (!book) throw new Error("Libro no existe");
        if (!book.available) throw new Error("Libro no disponible");

        book.available = false;
        this.books.update(book);

        const loan = new Loan(
            crypto.randomUUID(),
            studentId,
            bookId,
            new Date()
        );

        this.loans.save(loan);
        return loan;
    }
}
