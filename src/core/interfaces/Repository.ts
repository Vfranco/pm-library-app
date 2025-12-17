export interface Repository<T> {
    save(entity: T): void;
    delete(id: string): void;
    update(entity: T): void;
    getById(id: string): T | null;
    getAll(): T[];
}
