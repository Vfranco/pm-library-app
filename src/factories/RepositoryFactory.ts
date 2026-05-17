import { Repository } from "../core/interfaces/Repository";
import { InMemoryRepository } from "../repositories/InMemoryRepository";
// import { LocalStorageRepository } from "../repositories/LocalStorageRepository";

export class RepositoryFactory {
  createRepository<T extends { id: string }>(
    entityName?: string,
  ): Repository<T> {
    return new InMemoryRepository<T>();
    // return new LocalStorageRepository<T>(entityName || "default");
  }
}
