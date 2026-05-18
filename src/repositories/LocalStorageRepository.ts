import { Repository } from "../core/interfaces/Repository";

export class LocalStorageRepository<T extends { id: string }> implements Repository<T> {
    private storageKey: string;

    constructor(storageKey: string = 'library_default') {
        // Usa una clave fija proporcionada o una por defecto
        this.storageKey = storageKey;
        this.initializeStorage();
    }

    private initializeStorage(): void {
        if (typeof localStorage === 'undefined') {
            throw new Error('LocalStorage is not available in this environment');
        }
        
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify({}));
        }
    }

    private getItems(): Map<string, T> {
        try {
            const data = localStorage.getItem(this.storageKey);
            if (!data) {
                return new Map();
            }
            const parsed = JSON.parse(data, this.dateReviver);
            return new Map(Object.entries(parsed)) as Map<string, T>;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return new Map();
        }
    }

    private dateReviver(key: string, value: any): any {
        // Detecta strings que parecen fechas ISO y las convierte a Date
        if (typeof value === 'string') {
            const datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
            if (datePattern.test(value)) {
                return new Date(value);
            }
        }
        return value;
    }

    private setItems(items: Map<string, T>): void {
        try {
            const obj = Object.fromEntries(items);
            localStorage.setItem(this.storageKey, JSON.stringify(obj));
        } catch (error) {
            console.error('Error writing to localStorage:', error);
            throw new Error('Failed to save data to localStorage');
        }
    }

    save(entity: T): void {
        const items = this.getItems();
        items.set(entity.id, entity);
        this.setItems(items);
    }

    delete(id: string): void {
        const items = this.getItems();
        items.delete(id);
        this.setItems(items);
    }

    update(entity: T): void {
        const items = this.getItems();
        if (items.has(entity.id)) {
            items.set(entity.id, entity);
            this.setItems(items);
        }
    }

    getById(id: string): T | null {
        const items = this.getItems();
        return items.get(id) ?? null;
    }

    getAll(): T[] {
        const items = this.getItems();
        return Array.from(items.values());
    }

    clear(): void {
        localStorage.removeItem(this.storageKey);
        this.initializeStorage();
    }
}
