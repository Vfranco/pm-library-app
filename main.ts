import { LibrarySystem } from "./src/core/LibrarySystem";
import { InMemoryRepository } from "./src/repositories/InMemoryRepository";

import { Book } from "./src/entities/Book";
import { Student } from "./src/entities/Student";
import { Loan } from "./src/entities/Loan";

import { ConsoleView } from "./src/UI/View/ConsoleView";
import { Menu } from "./src/UI/Menu/Menu";

const bookRepository = new InMemoryRepository<Book>();
const studentRepository = new InMemoryRepository<Student>();
const loanRepository = new InMemoryRepository<Loan>();

const library = new LibrarySystem(
    bookRepository,
    studentRepository,
    loanRepository
);

const view = new ConsoleView();
const menu = new Menu(view, library);

menu.start();
