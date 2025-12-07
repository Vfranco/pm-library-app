import { Book } from "../../entities/Book";
import { View } from "../../interfaces/View";
import { Student } from "../../entities/Student";
var scanf = require("scanf");

export class ConsoleView implements View {

    render(): void {
        console.clear();
        console.log("--------- Biblioteca Virtual ----------");
    }

    showMessage(message: string): void {
        console.log(message);
    }

    readInput(): string { return scanf("%S"); }

    showBookList(books: Book[]): void {
        this.showMessage("\nLibros disponibles:");
        this.showMessage("-----------------------------------------------------------------------");
        this.showMessage("Titulo    Autor     Disponible    Id");
        books.forEach(b => this.showMessage(`- ${b.title} - ${b.author} (${b.available ? "Disponible" : "No disponible"} - ${b.id})`));
        this.showMessage("-----------------------------------------------------------------------");
    }

    showStudentList(students: Student[]): void {
        this.showMessage("\nEstudiantes registrados:");
        this.showMessage("------------------------------------------");
        this.showMessage("Nombre       Id");
        students.forEach(s => this.showMessage(`- ${s.name} : ${s.id}`));
        this.showMessage("------------------------------------------");
    }
}
