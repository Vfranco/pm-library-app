import { Book } from "../entities/Book";
import { Loan } from "../entities/Loan";
import { Student } from "../entities/Student";
import { Repository } from "../interfaces/Repository";

export class LoanService {
    constructor(private repository: Repository<Loan>) { }

    createLoan(studentId: string, bookId: string): Loan {
        const loan = new Loan(
            crypto.randomUUID(),
            studentId,
            bookId,
            new Date()
        );
        this.repository.save(loan);
        return loan;
    }

    validateLoan(student: Student | null, book: Book | null): void {
        if (!student) throw new Error("Estudiante no existe");
        if (!book) throw new Error("Libro no existe");
        if (!book.available) throw new Error("El libro no está disponible");
    }

    getAll(): Loan[] {
        return this.repository.getAll();
    }
}
