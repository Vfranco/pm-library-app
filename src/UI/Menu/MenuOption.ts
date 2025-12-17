export class MenuOption {
    constructor(
        public readonly key: string,
        public readonly label: string,
        public readonly action: () => void
    ) { }

    matches(input: string): boolean {
        return this.key === input;
    }

    display(): string {
        return `${this.key}. ${this.label}`;
    }
}
