import { Book } from "../entities/Book";
import { Student } from "../entities/Student";

export class LoanValidator {
    static validateLoan(student: Student | null, book: Book | null) {
        if (!student) throw new Error("Estudiante no existe");
        if (!book) throw new Error("Libro no existe");
        if (!book.available) throw new Error("El libro no está disponible");
    }
}