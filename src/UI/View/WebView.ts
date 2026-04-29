import { View } from "../../core/interfaces/View";
import { Book } from "../../core/entities/Book";
import { Student } from "../../core/entities/Student";
import { Loan } from "../../core/entities/Loan";
import { LibrarySystem } from "../../core/LibrarySystem";
import { WebHandler } from "../WebHandler";

export class WebView implements View {
    constructor(library: LibrarySystem) {
        new WebHandler(library);
    }

    showMessage(message: string): void {}

    showBookList(books: Book[]): void {}

    showStudentList(students: Student[]): void {}

    showLoanList(loans: Loan[]): void {}
}
