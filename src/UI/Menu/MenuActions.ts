import { ConsoleView } from "../View/ConsoleView";
import { LibrarySystem } from "../../core/LibrarySystem";

export class MenuActions {
    constructor(
        private view: ConsoleView,
        private library: LibrarySystem
    ) { }

    registerBook() {
        this.view.showMSG("Título del libro: ");
        const title = this.view.readInput();

        this.view.showMSG("Autor del libro: ");
        const author = this.view.readInput();

        this.library.registerBook(title, author);

        this.view.showMSG("Libro registrado.");
    }

    deleteBook() {
        this.view.showMSG("ID del libro a borrar: ");
        const id = this.view.readInput();

        this.library.deleteBook(id);

        this.view.showMSG("Libro borrado.");
    }

    registerStudent() {
        this.view.showMSG("Nombre del estudiante: ");
        const name = this.view.readInput();

        this.library.registerStudent(name);

        this.view.showMSG("Estudiante registrado.");
    }

    deleteStudent() {
        this.view.showMSG("ID del estudiante a borrar: ");
        const id = this.view.readInput();

        this.library.deleteStudent(id);

        this.view.showMSG("Estudiante borrado.");
    }

    loanBook() {
        this.showStudents();
        this.view.showMSG("ID del estudiante: ");
        const sid = this.view.readInput();

        this.showBooks();
        this.view.showMSG("ID del libro: ");
        const bid = this.view.readInput();

        try {
            this.library.loanBook(sid, bid);
            this.view.showMSG("Préstamo realizado.");
        } catch (err: any) {
            this.view.showMSG(`Error: ${err.message}`);
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
