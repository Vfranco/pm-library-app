import { Student } from "../entities/Student";
import { Repository } from "../interfaces/Repository";

export class StudentService {
    constructor(private repository: Repository<Student>) { }

    register(name: string): Student {
        const student: Student = {
            id: crypto.randomUUID(),
            name
        };
        this.repository.save(student);
        return student;
    }

    delete(id: string): void {
        this.repository.delete(id);
    }

    getById(id: string): Student | null {
        return this.repository.getById(id);
    }

    getAll(): Student[] {
        return this.repository.getAll();
    }
}
