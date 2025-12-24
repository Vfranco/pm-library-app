import { Book } from "../../core/entities/Book";
import { View } from "../../core/interfaces/View";
import { Student } from "../../core/entities/Student";
import { Loan } from "../../core/entities/Loan";
const scanf = require("scanf");
export class ConsoleView implements View {
    render(): void {
        console.clear();
        console.log("--------- Biblioteca Virtual ----------");
    }

    showMessage(message: string | null): void {
        console.log(message);
    }

    readInput(): string {
        return scanf("%S");
    }

    showBookList(books: Book[]): void {
        this.showMessage("\nLibros:");

        const bookTable = books.map(book => ({
            ID: book.id,
            Título: book.title,
            Autor: book.author,
            Estado: book.available ? 'Disponible' : 'No disponible'
        }));

        if (books.length === 0) {
            console.log('No hay libros registrados.');
            return;
        } else {
            console.table(bookTable);
        }
    }

    showStudentList(students: Student[]): void {
        this.showMessage("\nEstudiantes registrados:");

        const studentTable = students.map(student => ({
            ID: student.id,
            Nombre: student.name
        }));

        if (students.length === 0) {
            this.showMessage("No hay estudiantes registrados.");
        } else {
            console.table(studentTable);
        }
    }

    showLoanList(loans: Loan[]): void {
        this.showMessage("\nPréstamos:");

        const loanTable = loans.map(loan => ({
            'ID Préstamo': loan.id,
            'ID Libro': loan.bookId,
            'ID Estudiante': loan.studentId,
            'Fecha Préstamo': loan.loanDate.toLocaleDateString(),
        }));

        if (loans.length === 0) {
            this.showMessage("No hay préstamos registrados.");
        } else {
            console.table(loanTable);
        }
    }
}
