import { Repository } from "../core/interfaces/Repository";
import { InMemoryRepository } from "../repositories/InMemoryRepository";

export class RepositoryFactory {
    createRepository<T extends { id: string }>(): Repository<T> {
        return new InMemoryRepository<T>();
    }
}
