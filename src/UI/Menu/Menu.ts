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

            action ? action() : this.view.showMessage("Opción inválida.");

            if (option === "0") break;

            this.view.showMessage("\nPresiona cualquier tecla para continuar...");
            this.view.readInput();
        }
    }

    private printMenu() {
        this.view.render();
        this.view.showMessage("\n1. Registrar libro");
        this.view.showMessage("2. Borrar libro");
        this.view.showMessage("3. Registrar estudiante");
        this.view.showMessage("4. Borrar estudiante");
        this.view.showMessage("5. Realizar préstamo");
        this.view.showMessage("6. Mostrar libros");
        this.view.showMessage("7. Mostrar estudiantes");
        this.view.showMessage("0. Salir");
        this.view.showMessage("\nOpción: ");
    }

    private exitProgram() {
        this.view.showMessage("\n¡Hasta luego!");
    }
}
