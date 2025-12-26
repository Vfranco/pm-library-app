export class Loan {
    constructor(
        public id: string,
        public studentId: string,
        public bookId: string,
        public loanDate: Date,
        public returned: boolean = false
    ) { }
}