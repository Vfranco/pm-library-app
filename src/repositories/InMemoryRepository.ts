import { Repository } from "../core/interfaces/Repository";

export class InMemoryRepository<T extends { id: string }> implements Repository<T> {
    private items: Map<string, T> = new Map();

    save(entity: T): void {
        this.items.set(entity.id, entity);
    }

    delete(id: string): void {
        this.items.delete(id);
    }

    update(entity: T): void {
        if (this.items.has(entity.id)) {
            this.items.set(entity.id, entity);
        }
    }

    getById(id: string): T | null {
        return this.items.get(id) ?? null;
    }

    getAll(): T[] {
        return Array.from(this.items.values());
    }
}
