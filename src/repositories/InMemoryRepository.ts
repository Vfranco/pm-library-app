import { Repository } from "../interfaces/Repository";

export class InMemoryRepository<T> implements Repository<T> {
    private items: T[] = [];

    getAll(): T[] {
        return [...this.items];
    }

    getById(id: string): T | null {
        return this.items.find((item: any) => item.id === id) ?? null;
    }

    save(entity: any): void {
        this.items.push(entity);
    }

    update(entity: any): void {
        const index = this.items.findIndex((item: any) => item.id === entity.id);
        if (index >= 0) {
            this.items[index] = entity;
        }
    }

    delete(id: string): void {
        this.items = this.items.filter((item: any) => item.id !== id);
    }
}
