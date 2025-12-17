import { View } from "../../core/interfaces/View";
import { LibrarySystem } from "../../core/LibrarySystem";

export class MenuActions {
    constructor(
        private view: View,
        private library: LibrarySystem
    ) { }

    registerBook(): void {
        this.view.showMessage("Título del libro: ");
        const title = this.view.readInput();
        this.view.showMessage("Autor del libro: ");
        const author = this.view.readInput();
        this.library.books.register(title, author);
        this.view.showMessage("Libro registrado.");
    }

    deleteBook(): void {
        this.view.showMessage("ID del libro a borrar: ");
        const id = this.view.readInput();
        this.library.books.delete(id);
        this.view.showMessage("Libro borrado.");
    }

    registerStudent(): void {
        this.view.showMessage("Nombre del estudiante: ");
        const name = this.view.readInput();
        this.library.students.register(name);
        this.view.showMessage("Estudiante registrado.");
    }

    deleteStudent(): void {
        this.view.showMessage("ID del estudiante a borrar: ");
        const id = this.view.readInput();
        this.library.students.delete(id);
        this.view.showMessage("Estudiante borrado.");
    }

    loanBook(): void {
        this.showStudents();
        this.view.showMessage("ID del estudiante: ");
        const studentId = this.view.readInput();

        this.showBooks();
        this.view.showMessage("ID del libro: ");
        const bookId = this.view.readInput();

        try {
            this.library.loanBook(studentId, bookId);
            this.view.showMessage("Préstamo realizado.");
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
}
