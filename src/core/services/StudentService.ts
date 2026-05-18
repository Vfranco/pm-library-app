import { Student } from "../entities/Student";
import { Repository } from "../interfaces/Repository";
import { StudentValidator } from "../validators/StudentValidator";
import { Service } from "../interfaces/Service";

export class StudentService implements Service<Student> {
  static readonly entityName = "students";

  constructor(
    private repository: Repository<Student>,
    private validator: StudentValidator,
  ) {}

  register(name: string, id: string): Student {
    this.validator.validate(name, id);

    const existingStudent = this.repository.getById(id);
    if (existingStudent) {
      throw new Error("Ya existe un estudiante con ese ID");
    }

    const student = new Student(id.trim(), name.trim());

    this.repository.save(student);
    return student;
  }

  delete(id: string): void {
    if (!this.repository.getById(id)) {
      throw new Error("ID de estudiante no encontrado");
    }
    this.repository.delete(id);
  }

  getById(id: string): Student | null {
    return this.repository.getById(id);
  }

  getAll(): Student[] {
    return this.repository.getAll();
  }
}
