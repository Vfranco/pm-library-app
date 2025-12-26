import { IdGenerator } from "../interfaces/IdGenerator";

export class CryptoIdGenerator implements IdGenerator {
    generate(): string {
        return crypto.randomUUID();
    }
}