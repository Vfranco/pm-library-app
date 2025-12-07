import { ConsoleView } from "../View/ConsoleView";
import { LibrarySystem } from "../../core/LibrarySystem";

export class MenuActions {
    constructor(
        private view: ConsoleView,
        private library: LibrarySystem
    ) { }

    registerBook() {
        this.view.showMessage("Título del libro: ");
        const title = this.view.readInput();

        this.view.showMessage("Autor del libro: ");
        const author = this.view.readInput();

        this.library.registerBook(title, author);

        this.view.showMessage("Libro registrado.");
    }

    deleteBook() {
        this.view.showMessage("ID del libro a borrar: ");
        const id = this.view.readInput();

        this.library.deleteBook(id);

        this.view.showMessage("Libro borrado.");
    }

    registerStudent() {
        this.view.showMessage("Nombre del estudiante: ");
        const name = this.view.readInput();

        this.library.registerStudent(name);

        this.view.showMessage("Estudiante registrado.");
    }

    deleteStudent() {
        this.view.showMessage("ID del estudiante a borrar: ");
        const id = this.view.readInput();

        this.library.deleteStudent(id);

        this.view.showMessage("Estudiante borrado.");
    }

    loanBook() {
        this.showStudents();
        this.view.showMessage("ID del estudiante: ");
        const sid = this.view.readInput();

        this.showBooks();
        this.view.showMessage("ID del libro: ");
        const bid = this.view.readInput();

        try {
            this.library.loanBook(sid, bid);
            this.view.showMessage("Préstamo realizado.");
        } catch (err: any) {
            this.view.showMessage(`Error: ${err.message}`);
        }
    }

    showBooks() {
        const books = this.library.getAllBooks();
        this.view.showBookList(books);
    }

    showStudents() {
        const students = this.library.getAllStudents();
        this.view.showStudentList(students);
    }
}
