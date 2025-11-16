export interface Repository<T> {
    getAll(): T[];
    getById(id: string): T | null;
    save(entity: T): void;
    update(entity: T): void;
    delete(id: string): void;
}
