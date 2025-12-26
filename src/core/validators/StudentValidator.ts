export class StudentValidator {
    validateStudentData(name: string, id: string): void {
        if (!name || name.trim().length === 0) {
            throw new Error("El nombre no puede estar vacío");
        }
        if (name.trim().length < 2) {
            throw new Error("El nombre debe tener al menos 2 caracteres");
        }
        if (!id || id.trim().length === 0) {
            throw new Error("El ID no puede estar vacío");
        }
    }
}