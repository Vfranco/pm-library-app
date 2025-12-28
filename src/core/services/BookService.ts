import { Book } from "../entities/Book";
import { Repository } from "../interfaces/Repository";
import { IdGenerator } from "../interfaces/IdGenerator";
import { BookValidator } from "../validators/BookValidator";
import { CrudRepository } from "../interfaces/CrudRepository";

export class BookService implements CrudRepository<Book> {
    constructor(
        private repository: Repository<Book>,
        private idGenerator: IdGenerator,
        private validator: BookValidator
    ) { }

    register(title: string, author: string): Book {
        this.validator.validateBookData(title, author);

        const book = new Book(
            this.idGenerator.generate(),
            title.trim(),
            author.trim(),
            true
        );

        this.repository.save(book);
        return book;
    }

    delete(id: string): void {
        const book = this.repository.getById(id);
        if (!book) {
            throw new Error("Libro no encontrado");
        }
        this.repository.delete(id);
    }

    getById(id: string): Book | null {
        return this.repository.getById(id);
    }

    getAll(): Book[] {
        return this.repository.getAll();
    }

    markAsUnavailable(book: Book): void {
        book.available = false;
        this.repository.update(book);
    }

    markAsAvailable(book: Book): void {
        book.available = true;
        this.repository.update(book);
    }
}