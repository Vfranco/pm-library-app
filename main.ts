import { LibrarySystem } from "./src/core/LibrarySystem";
import { CryptoIdGenerator } from "./src/core/implementations/CryptoIdGenerator";
import { SystemDateProvider } from "./src/core/implementations/SystemDateProvider";
import { LoanValidator } from "./src/core/validators/LoanValidator";
import { RepositoryFactory } from "./src/factories/RepositoryFactory";
import { ServiceFactory } from "./src/factories/ServiceFactory";
import { BookService } from "./src/core/services/BookService";
import { StudentService } from "./src/core/services/StudentService";
import { LoanService } from "./src/core/services/LoanService";

/* - Vista activa - */
// Web
import { WebView } from "./src/UI/View/WebView";

// Consola
// import { ConsoleView } from "./src/UI/View/ConsoleView";
// import { Menu } from "./src/UI/Menu/Menu";

const idGenerator = new CryptoIdGenerator();
const dateProvider = new SystemDateProvider();

const repositoryFactory = new RepositoryFactory();
const serviceFactory = new ServiceFactory(
    repositoryFactory,
    idGenerator,
    dateProvider,
);

const bookService = serviceFactory.createService(BookService);
const studentService = serviceFactory.createService(StudentService);
const loanService = serviceFactory.createService(LoanService);

const loanValidator = new LoanValidator();
const library = new LibrarySystem(
    bookService,
    studentService,
    loanService,
    loanValidator,
);

// Web
const view = new WebView(library);

// Consola:
// const view = new ConsoleView();
// new Menu(view, library).start();
