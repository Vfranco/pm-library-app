import { Book } from "../../core/entities/Book";
import { View } from "../../core/interfaces/View";
import { Student } from "../../core/entities/Student";
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
        this.showMessage("\nLibros disponibles:");
        this.showMessage("-----------------------------------------------------------------------");
        this.showMessage("Titulo                  Autor                 Disponible");
        this.showMessage("-----------------------------------------------------------------------");
        if (books.length === 0) {
            this.showMessage("No hay libros registrados.");
        } else {
            books.forEach(b => {
                const status = b.available ? "Disponible" : "No disponible";
                this.showMessage(`${b.title.padEnd(24)}${b.author.padEnd(22)}${status}`);
                this.showMessage(`  ID: ${b.id}`);
            });
        }
        this.showMessage("-----------------------------------------------------------------------");
    }

    showStudentList(students: Student[]): void {
        this.showMessage("\nEstudiantes registrados:");
        this.showMessage("------------------------------------------");
        this.showMessage("Nombre                  ID");
        this.showMessage("------------------------------------------");
        if (students.length === 0) {
            this.showMessage("No hay estudiantes registrados.");
        } else {
            students.forEach(s => {
                this.showMessage(`${s.name.padEnd(24)}${s.id}`);
            });
        }
        this.showMessage("------------------------------------------");
    }
}
