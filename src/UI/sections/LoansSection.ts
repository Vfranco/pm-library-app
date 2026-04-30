import { LibrarySystem } from "../../core/LibrarySystem";
import { el, val, esc } from "./section-utils";

export class LoansSection {

    constructor(
        private library: LibrarySystem,
        private onChanged: () => void,
        private toast: (msg: string, type: "success" | "error") => void
    ) {}

    setup(): void {
        const btnOpen   = el("btn-open-add-loan");
        const btnCancel = el("btn-cancel-add-loan");
        const formCard  = el("form-add-loan");
        const form      = el<HTMLFormElement>("add-loan-form");

        btnOpen.addEventListener("click", () => {
            this.populateSelects();
            formCard.hidden = false;
        });

        btnCancel.addEventListener("click", () => {
            formCard.hidden = true;
            form.reset();
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            try {
                this.library.loanBook(val("loan-student-id"), val("loan-book-id"));
                this.toast("Préstamo registrado correctamente.", "success");
                form.reset();
                formCard.hidden = true;
                this.render();
                this.onChanged();
            } catch (err: any) {
                this.toast(err.message, "error");
            }
        });
    }

    render(): void {
        const tbody = el("loans-tbody");
        const all   = this.library.loans.getAll();

        if (all.length === 0) {
            tbody.innerHTML = `<tr class="empty-row"><td colspan="6">No hay préstamos registrados.</td></tr>`;
            return;
        }

        tbody.innerHTML = all.map(l => {
            const student = this.library.students.getById(l.studentId);
            const book    = this.library.books.getById(l.bookId);
            const actions = l.returned
                ? `<button class="btn btn-danger btn-sm" data-action="delete-loan" data-id="${l.id}">Eliminar</button>`
                : `<button class="btn btn-success btn-sm" data-action="return-loan" data-id="${l.id}">Devolver</button>
                   <button class="btn btn-danger btn-sm"  data-action="delete-loan" data-id="${l.id}">Eliminar</button>`;

            return `
                <tr>
                    <td><code>${l.id}</code></td>
                    <td>${student ? esc(student.name) : l.studentId}</td>
                    <td>${book    ? esc(book.title)   : l.bookId}</td>
                    <td>${l.loanDate.toLocaleDateString("es")}</td>
                    <td>${l.returned
                        ? `<span class="badge badge-warning">Devuelto</span>`
                        : `<span class="badge badge-success">Activo</span>`}
                    </td>
                    <td><div class="actions-cell">${actions}</div></td>
                </tr>
            `;
        }).join("");

        tbody.querySelectorAll<HTMLButtonElement>("[data-action='return-loan']").forEach(btn => {
            btn.addEventListener("click", () => this.return(btn.dataset.id!));
        });

        tbody.querySelectorAll<HTMLButtonElement>("[data-action='delete-loan']").forEach(btn => {
            btn.addEventListener("click", () => this.delete(btn.dataset.id!));
        });
    }

    private return(id: string): void {
        try {
            this.library.returnBook(id);
            this.toast("Libro devuelto correctamente.", "success");
            this.render();
            this.onChanged();
        } catch (err: any) {
            this.toast(err.message, "error");
        }
    }

    private delete(id: string): void {
        if (!confirm("¿Eliminar este préstamo?")) return;
        try {
            this.library.loans.delete(id);
            this.toast("Préstamo eliminado.", "success");
            this.render();
        } catch (err: any) {
            this.toast(err.message, "error");
        }
    }

    private populateSelects(): void {
        const studentSel = el<HTMLSelectElement>("loan-student-id");
        const bookSel    = el<HTMLSelectElement>("loan-book-id");

        studentSel.innerHTML = `<option value="">Selecciona un estudiante…</option>` +
            this.library.students.getAll()
                .map(s => `<option value="${s.id}">${esc(s.name)} (${s.id})</option>`)
                .join("");

        bookSel.innerHTML = `<option value="">Selecciona un libro…</option>` +
            this.library.books.getAll()
                .filter(b => b.available)
                .map(b => `<option value="${b.id}">${esc(b.title)} — ${esc(b.author)}</option>`)
                .join("");
    }
}
