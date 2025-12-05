import { Book } from "../entities/Book";
import { Student } from "../entities/Student";

export interface View {
    render(): void;
    showMSG(message: string): void;
    readInput(prompt: string | null): string;
    showBookList(books: Book[]): void;
    showStudentList(students: Student[]): void;
}