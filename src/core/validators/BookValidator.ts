import { Validator } from "../interfaces/Validator";
export class BookValidator implements Validator {
    validate(title: string, author: string): void {
        if (!title || title.trim().length === 0) {
            throw new Error("El título no puede estar vacío");
        }
        if (title.trim().length < 2) {
            throw new Error("El título debe tener al menos 2 caracteres");
        }
        if (!author || author.trim().length === 0) {
            throw new Error("El autor no puede estar vacío");
        }
        if (author.trim().length < 2) {
            throw new Error("El autor debe tener al menos 2 caracteres");
        }
    }
}
