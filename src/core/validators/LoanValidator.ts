import { Book } from "../entities/Book";
import { Student } from "../entities/Student";
import { Validator } from "../interfaces/Validator";

export class LoanValidator implements Validator {
    validate(student: Student | null, book: Book | null): void {
        if (!student) {
            throw new Error("Estudiante no existe");
        }
        if (!book) {
            throw new Error("Libro no existe");
        }
        if (!book.available) {
            throw new Error("El libro no está disponible");
        }
    }
}