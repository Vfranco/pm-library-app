// Comentario para hacer commit del dist borrado

import { LibrarySystem } from "./src/core/LibrarySystem";
import { BookService } from "./src/core/services/BookService";
import { StudentService } from "./src/core/services/StudentService";
import { LoanService } from "./src/core/services/LoanService";
import { InMemoryRepository } from "./src/repositories/InMemoryRepository";
import { Book } from "./src/core/entities/Book";
import { Student } from "./src/core/entities/Student";
import { Loan } from "./src/core/entities/Loan";
import { CryptoIdGenerator } from "./src/core/implementations/CryptoIdGenerator";
import { SystemDateProvider } from "./src/core/implementations/SystemDateProvider";
import { BookValidator } from "./src/core/validators/BookValidator";
import { StudentValidator } from "./src/core/validators/StudentValidator";
import { LoanValidator } from "./src/core/validators/LoanValidator";
import { ConsoleView } from "./src/UI/View/ConsoleView";
import { Menu } from "./src/UI/Menu/Menu";

const bookRepository = new InMemoryRepository<Book>();
const studentRepository = new InMemoryRepository<Student>();
const loanRepository = new InMemoryRepository<Loan>();

const idGenerator = new CryptoIdGenerator();
const dateProvider = new SystemDateProvider();

const bookValidator = new BookValidator();
const studentValidator = new StudentValidator();
const loanValidator = new LoanValidator();

const bookService = new BookService(
    bookRepository,
    idGenerator,
    bookValidator
);

const studentService = new StudentService(
    studentRepository,
    studentValidator
);

const loanService = new LoanService(
    loanRepository,
    idGenerator,
    dateProvider
);

const library = new LibrarySystem(
    bookService,
    studentService,
    loanService,
    loanValidator
);

const view = new ConsoleView();
const menu = new Menu(view, library);

menu.start();