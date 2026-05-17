import { BookService } from "../core/services/BookService";
import { StudentService } from "../core/services/StudentService";
import { LoanService } from "../core/services/LoanService";
import { RepositoryFactory } from "./RepositoryFactory";
import { IdGenerator } from "../core/interfaces/IdGenerator";
import { DateProvider } from "../core/interfaces/DateProvider";
import { BookValidator } from "../core/validators/BookValidator";
import { StudentValidator } from "../core/validators/StudentValidator";

export class ServiceFactory {
  private dependencies: Map<any, any[]>;

  constructor(
    private repositoryFactory: RepositoryFactory,
    private idGenerator: IdGenerator,
    private dateProvider: DateProvider,
  ) {
    const bookValidator = new BookValidator();
    const studentValidator = new StudentValidator();

    this.dependencies = new Map();
    this.dependencies.set(BookService, [this.idGenerator, bookValidator]);
    this.dependencies.set(StudentService, [studentValidator]);
    this.dependencies.set(LoanService, [this.idGenerator, this.dateProvider]);
  }

  createService<T>(ServiceClass: new (...args: any[]) => T): T {
    const entityName = (ServiceClass as any).entityName;
    const repository = this.repositoryFactory.createRepository(entityName);
    const deps = this.dependencies.get(ServiceClass) || [];
    return new ServiceClass(repository, ...deps);
  }
}
