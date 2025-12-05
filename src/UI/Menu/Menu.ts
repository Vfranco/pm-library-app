import { ConsoleView } from "../View/ConsoleView";
import { LibrarySystem } from "../../core/LibrarySystem";
import { MenuActions } from "./MenuActions";

export class Menu {
    constructor(
        private view: ConsoleView,
        private library: LibrarySystem
    ) { }

    start() {
        const actions = new MenuActions(this.view, this.library);

        const map: Record<string, () => void> = {
            "1": () => actions.registerBook(),
            "2": () => actions.deleteBook(),
            "3": () => actions.registerStudent(),
            "4": () => actions.deleteStudent(),
            "5": () => actions.loanBook(),
            "6": () => actions.showBooks(),
            "7": () => actions.showStudents(),
            "0": () => this.exitProgram()
        };

        while (true) {
            this.printMenu();

            const option = this.view.readInput();
            const action = map[option];

            action ? action() : this.view.showMSG("Opción inválida.");

            if (option === "0") break;

            this.view.showMSG("\nPresiona cualquier tecla para continuar...");
            this.view.readInput();
        }
    }

    private printMenu() {
        this.view.render();
        this.view.showMSG("\n1. Registrar libro");
        this.view.showMSG("2. Borrar libro");
        this.view.showMSG("3. Registrar estudiante");
        this.view.showMSG("4. Borrar estudiante");
        this.view.showMSG("5. Realizar préstamo");
        this.view.showMSG("6. Mostrar libros");
        this.view.showMSG("7. Mostrar estudiantes");
        this.view.showMSG("0. Salir");
        this.view.showMSG("\nOpción: ");
    }

    private exitProgram() {
        this.view.showMSG("\n¡Hasta luego!");
    }
}
