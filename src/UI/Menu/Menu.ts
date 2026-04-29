import { ConsoleView } from "../View/ConsoleView";
import { LibrarySystem } from "../../core/LibrarySystem";
import { MenuOption } from "./MenuOption";
import { MenuActions } from "./MenuActions";

export class Menu {
    private options: MenuOption[] = [];
    private running = true;

    constructor(
        private view: ConsoleView,
        private library: LibrarySystem
    ) {
        this.buildOptions();
    }

    private buildOptions(): void {
        const actions = new MenuActions(this.view, this.library);

        this.options = [
            new MenuOption("1",  "Registrar libro",                          () => actions.registerBook()),
            new MenuOption("2",  "Borrar libro",                             () => actions.deleteBook()),
            new MenuOption("3",  "Registrar estudiante",                     () => actions.registerStudent()),
            new MenuOption("4",  "Borrar estudiante",                        () => actions.deleteStudent()),
            new MenuOption("5",  "Realizar préstamo",                        () => actions.loanBook()),
            new MenuOption("6",  "Devolver libro",                           () => actions.returnBook()),
            new MenuOption("7",  "Borrar préstamo",                          () => actions.deleteLoan()),
            new MenuOption("8",  "Mostrar libros",                           () => actions.showBooks()),
            new MenuOption("9",  "Mostrar estudiantes",                      () => actions.showStudents()),
            new MenuOption("10", "Ver préstamos activos por estudiante",     () => actions.showActiveLoansByStudent()),
            new MenuOption("0",  "Salir",                                    () => this.exit()),
        ];
    }

    async start(): Promise<void> {
        while (this.running) {
            this.printMenu();
            const input = await this.view.readInput();
            await this.executeOption(input);

            if (this.running) {
                this.view.showMessage("\nPresiona cualquier tecla para continuar...");
                await this.view.readInput();
            }
        }
    }

    private printMenu(): void {
        this.view.render();
        this.view.showMessage("");
        this.options.forEach(opt => this.view.showMessage(opt.display()));
        this.view.showMessage("\nOpción: ");
    }

    private async executeOption(input: string): Promise<void> {
        const option = this.options.find(opt => opt.matches(input));
        if (option) {
            await option.action();
        } else {
            this.view.showMessage("Opción inválida.");
        }
    }

    private exit(): void {
        this.view.showMessage("\n¡Hasta luego!");
        this.running = false;
    }
}
