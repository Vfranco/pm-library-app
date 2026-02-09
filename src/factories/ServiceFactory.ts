import { BookService } from "../core/services/BookService";
import { StudentService } from "../core/services/StudentService";
import { LoanService } from "../core/services/LoanService";
import { RepositoryFactory } from "./RepositoryFactory";
import { IdGenerator } from "../core/interfaces/IdGenerator";
import { DateProvider } from "../core/interfaces/DateProvider";
import { BookValidator } from "../core/validators/BookValidator";
import { StudentValidator } from "../core/validators/StudentValidator";
import { Book } from "../core/entities/Book";
import { Student } from "../core/entities/Student";
import { Loan } from "../core/entities/Loan";

export class ServiceFactory {
    private bookValidator: BookValidator;
    private studentValidator: StudentValidator;

    constructor(
        private repositoryFactory: RepositoryFactory,
        private idGenerator: IdGenerator,
        private dateProvider: DateProvider
    ) {
        this.bookValidator = new BookValidator();
        this.studentValidator = new StudentValidator();
    }

    createBookService(): BookService {
        const bookRepository = this.repositoryFactory.createRepository<Book>();
        return new BookService(
            bookRepository,
            this.idGenerator,
            this.bookValidator
        );
    }

    createStudentService(): StudentService {
        const studentRepository = this.repositoryFactory.createRepository<Student>();
        return new StudentService(
            studentRepository,
            this.studentValidator
        );
    }

    createLoanService(): LoanService {
        const loanRepository = this.repositoryFactory.createRepository<Loan>();
        return new LoanService(
            loanRepository,
            this.idGenerator,
            this.dateProvider
        );
    }
}
