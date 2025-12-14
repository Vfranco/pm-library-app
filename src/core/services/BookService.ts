import { Book } from "../entities/Book";
import { Repository } from "../interfaces/Repository";

export class BookService {
    constructor(private repository: Repository<Book>) { }

    register(title: string, author: string): Book {
        const book: Book = {
            id: crypto.randomUUID(),
            title,
            author,
            available: true
        };
        this.repository.save(book);
        return book;
    }

    delete(id: string): void {
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
