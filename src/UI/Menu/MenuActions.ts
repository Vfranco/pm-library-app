import { View } from "../../core/interfaces/View";
import { LibrarySystem } from "../../core/LibrarySystem";

export class MenuActions {
    constructor(
        private view: View,
        private library: LibrarySystem
    ) { }

    registerBook(): void {
        try {
            this.view.showMessage("Título del libro: ");
            const title = this.view.readInput();
            this.view.showMessage("Autor del libro: ");
            const author = this.view.readInput();

            this.library.books.register(title, author);
            this.view.showMessage("Libro registrado exitosamente.");
        } catch (err: any) {
            this.view.showMessage(`Error: ${err.message}`);
        }
    }

    deleteBook(): void {
        try {
            this.showBooks();
            this.view.showMessage("ID del libro a borrar: ");
            const id = this.view.readInput();

            this.library.books.delete(id);
            this.view.showMessage("Libro borrado exitosamente.");
        } catch (err: any) {
            this.view.showMessage(`Error: ${err.message}`);
        }
    }

    registerStudent(): void {
        try {
            this.view.showMessage("Nombre del estudiante: ");
            const name = this.view.readInput();
            this.view.showMessage("Número de documento del estudiante: ");
            const id = this.view.readInput();

            this.library.students.register(name, id);
            this.view.showMessage("Estudiante registrado exitosamente.");
        } catch (err: any) {
            this.view.showMessage(`Error: ${err.message}`);
        }
    }

    deleteStudent(): void {
        try {
            this.showStudents();
            this.view.showMessage("ID del estudiante a borrar: ");
            const id = this.view.readInput();

            this.library.students.delete(id);
            this.view.showMessage("Estudiante borrado exitosamente.");
        } catch (err: any) {
            this.view.showMessage(`Error: ${err.message}`);
        }
    }

    loanBook(): void {
        try {
            this.showStudents();
            this.view.showMessage("ID del estudiante: ");
            const studentId = this.view.readInput();

            this.showBooks();
            this.view.showMessage("ID del libro: ");
            const bookId = this.view.readInput();

            this.library.loanBook(studentId, bookId);
            this.view.showMessage("Préstamo realizado exitosamente.");
        } catch (err: any) {
            this.view.showMessage(`Error: ${err.message}`);
        }
    }

    deleteLoan(): void {
        try {
            const allLoans = this.library.loans.getAll();

            if (allLoans.length === 0) {
                this.view.showMessage("No hay préstamos registrados.");
                return;
            }

            this.view.showLoanList(allLoans);

            this.view.showMessage("\nID del préstamo a borrar: ");
            const id = this.view.readInput();

            this.library.loans.delete(id);
            this.view.showMessage("Préstamo borrado exitosamente.");
        } catch (err: any) {
            this.view.showMessage(`Error: ${err.message}`);
        }
    }

    showBooks(): void {
        const books = this.library.books.getAll();
        this.view.showBookList(books);
    }

    showStudents(): void {
        const students = this.library.students.getAll();
        this.view.showStudentList(students);
    }

    showActiveLoansByStudent(): void {
        try {
            this.showStudents();
            this.view.showMessage("\nID del estudiante: ");
            const studentId = this.view.readInput();

            const student = this.library.students.getById(studentId);

            if (!student) {
                this.view.showMessage("Error: Estudiante no encontrado");
                return;
            }

            const activeLoans = this.library.loans.getActiveLoansByStudent(studentId);

            if (activeLoans.length === 0) {
                this.view.showMessage(`\nEl estudiante ${student.name} no tiene préstamos activos.`);
            } else {
                this.view.showMessage(`\nPréstamos activos de ${student.name}:`);
                this.view.showLoanList(activeLoans);
            }

        } catch (err: any) {
            this.view.showMessage(`Error: ${err.message}`);
        }
    }

    returnBook(): void {
        try {
            this.showStudents();
            this.view.showMessage("\nID del estudiante: ");
            const studentId = this.view.readInput();

            const student = this.library.students.getById(studentId);
            if (!student) {
                this.view.showMessage("Error: Estudiante no encontrado");
                return;
            }

            const activeLoans = this.library.loans.getActiveLoansByStudent(studentId);
            if (activeLoans.length === 0) {
                this.view.showMessage(`\nEl estudiante ${student.name} no tiene préstamos activos.`);
                return;
            }

            this.view.showMessage(`\nPréstamos activos de ${student.name}:`);
            this.view.showLoanList(activeLoans);

            this.view.showMessage("\nID del préstamo a retornar: ");
            const loanId = this.view.readInput();

            this.library.returnBook(loanId);
            this.view.showMessage("Libro retornado exitosamente.");
        } catch (err: any) {
            this.view.showMessage(`Error: ${err.message}`);
        }
    }
}