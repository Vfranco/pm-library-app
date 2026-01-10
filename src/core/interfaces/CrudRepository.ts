export interface CrudRepository<T> {
    register(...args: any[]): T;
    delete(id: string): void;
    getById(id: string): T | null;
    getAll(): T[];
}