import { LibrarySystem } from "./src/core/LibrarySystem";
import { CryptoIdGenerator } from "./src/core/implementations/CryptoIdGenerator";
import { SystemDateProvider } from "./src/core/implementations/SystemDateProvider";
import { LoanValidator } from "./src/core/validators/LoanValidator";
import { ConsoleView } from "./src/UI/View/ConsoleView";
import { Menu } from "./src/UI/Menu/Menu";
import { RepositoryFactory } from "./src/factories/RepositoryFactory";
import { ServiceFactory } from "./src/factories/ServiceFactory";

const idGenerator = new CryptoIdGenerator();
const dateProvider = new SystemDateProvider();

const repositoryFactory = new RepositoryFactory();
const serviceFactory = new ServiceFactory(
    repositoryFactory,
    idGenerator,
    dateProvider
);

const bookService = serviceFactory.createBookService();
const studentService = serviceFactory.createStudentService();
const loanService = serviceFactory.createLoanService();

const loanValidator = new LoanValidator();
const library = new LibrarySystem(
    bookService,
    studentService,
    loanService,
    loanValidator
);

const view = new ConsoleView();
const menu = new Menu(view, library);

menu.start();