import { Book } from "./src/core/entities/Book";
import { Loan } from "./src/core/entities/Loan";
import { Student } from "./src/core/entities/Student";
import { InMemoryRepository } from "./src/repositories/InMemoryRepository";
import { BookService } from "./src/core/services/BookService";
import { StudentService } from "./src/core/services/StudentService";
import { LoanService } from "./src/core/services/LoanService";
import { LibrarySystem } from "./src/core/LibrarySystem";
import { ConsoleView } from "./src/UI/View/ConsoleView";
import { Menu } from "./src/UI/Menu/Menu";

const bookRepository = new InMemoryRepository<Book>();
const studentRepository = new InMemoryRepository<Student>();
const loanRepository = new InMemoryRepository<Loan>();

const bookService = new BookService(bookRepository);
const studentService = new StudentService(studentRepository);
const loanService = new LoanService(loanRepository);

const library = new LibrarySystem(bookService, studentService, loanService);
const view = new ConsoleView();
const menu = new Menu(view, library);

menu.start();
