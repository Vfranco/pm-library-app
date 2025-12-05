import { Book } from "../../entities/Book";
import { View } from "../../interfaces/View";
import { Student } from "../../entities/Student";
var scanf = require("scanf");

export class ConsoleView implements View {

    render(): void {
        console.clear();
        console.log("--------- Biblioteca Virtual ----------");
    }

    showMSG(message: string): void {
        console.log(message);
    }

    readInput(): string { return scanf("%S"); }

    showBookList(books: Book[]): void {
        this.showMSG("\nLibros disponibles:");
        this.showMSG("-----------------------------------------------------------------------");
        this.showMSG("Titulo    Autor     Disponible    Id");
        books.forEach(b => this.showMSG(`- ${b.title} - ${b.author} (${b.available ? "Disponible" : "No disponible"} - ${b.id})`));
        this.showMSG("-----------------------------------------------------------------------");
    }

    showStudentList(students: Student[]): void {
        this.showMSG("\nEstudiantes registrados:");
        this.showMSG("------------------------------------------");
        this.showMSG("Nombre       Id");
        students.forEach(s => this.showMSG(`- ${s.name} : ${s.id}`));
        this.showMSG("------------------------------------------");
    }
}
