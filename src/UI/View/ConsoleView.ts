import { View } from "../../core/interfaces/View";
import { Book } from "../../core/entities/Book";
import { Student } from "../../core/entities/Student";
import { Loan } from "../../core/entities/Loan";

const scanf = require("scanf");
export class ConsoleView implements View {
    render(): void {
        console.clear();
        console.log("--------- Biblioteca Virtual ----------");
    }

    async readInput(): Promise<string> {
        return scanf("%S");
    }

    showMessage(message: string): void {
        console.log(message);
    }

    showBookList(books: Book[]): void {
        this.showMessage("\nLibros:");
        if (books.length === 0) {
            console.log("No hay libros registrados.");
            return;
        }
        console.table(
            books.map((b) => ({
                ID: b.id,
                Título: b.title,
                Autor: b.author,
                Estado: b.available ? "Disponible" : "No disponible",
            })),
        );
    }

    showStudentList(students: Student[]): void {
        this.showMessage("\nEstudiantes registrados:");
        if (students.length === 0) {
            this.showMessage("No hay estudiantes registrados.");
            return;
        }
        console.table(students.map((s) => ({ ID: s.id, Nombre: s.name })));
    }

    showLoanList(loans: Loan[]): void {
        this.showMessage("\nPréstamos:");
        if (loans.length === 0) {
            this.showMessage("No hay préstamos registrados.");
            return;
        }
        console.table(
            loans.map((l) => ({
                "ID Préstamo": l.id,
                "ID Libro": l.bookId,
                "ID Estudiante": l.studentId,
                "Fecha Préstamo": l.loanDate.toLocaleDateString(),
            })),
        );
    }
}
