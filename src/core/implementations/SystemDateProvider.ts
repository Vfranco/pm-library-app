import { DateProvider } from "../interfaces/DateProvider";

export class SystemDateProvider implements DateProvider {
    now(): Date {
        return new Date();
    }
}