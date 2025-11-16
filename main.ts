import { LibrarySystem } from "./src/core/LibrarySystem";
import { InMemoryRepository } from "./src/repositories/InMemoryRepository";

import { Book } from "./src/entities/Book";
import { Student } from "./src/entities/Student";
import { Loan } from "./src/entities/Loan";

const bookRepository = new InMemoryRepository<Book>();
const studentRepository = new InMemoryRepository<Student>();
const loanRepository = new InMemoryRepository<Loan>();

const library = new LibrarySystem(
    bookRepository,
    studentRepository,
    loanRepository
);