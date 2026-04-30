import { BookService } from "../../core/services/BookService";
import { el, val, esc } from "./section-utils";

export class BooksSection {

    constructor(
        private books: BookService,
        private onChanged: () => void,
        private toast: (msg: string, type: "success" | "error") => void
    ) {}

    setup(): void {
        const btnOpen   = el("btn-open-add-book");
        const btnCancel = el("btn-cancel-add-book");
        const formCard  = el("form-add-book");
        const form      = el<HTMLFormElement>("add-book-form");

        btnOpen.addEventListener("click", () => {
            formCard.hidden = false;
            el<HTMLInputElement>("book-title").focus();
        });

        btnCancel.addEventListener("click", () => {
            formCard.hidden = true;
            form.reset();
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            try {
                this.books.register(val("book-title"), val("book-author"));
                this.toast("Libro registrado correctamente.", "success");
                form.reset();
                formCard.hidden = true;
                this.render();
            } catch (err: any) {
                this.toast(err.message, "error");
            }
        });
    }

    render(): void {
        const tbody = el("books-tbody");
        const all   = this.books.getAll();

        if (all.length === 0) {
            tbody.innerHTML = `<tr class="empty-row"><td colspan="5">No hay libros registrados.</td></tr>`;
            return;
        }

        tbody.innerHTML = all.map(b => `
            <tr>
                <td><code>${b.id}</code></td>
                <td>${esc(b.title)}</td>
                <td>${esc(b.author)}</td>
                <td>${b.available
                    ? `<span class="badge badge-success">Disponible</span>`
                    : `<span class="badge badge-danger">Prestado</span>`}
                </td>
                <td><div class="actions-cell">
                    <button class="btn btn-danger btn-sm" data-action="delete-book" data-id="${b.id}">Eliminar</button>
                </div></td>
            </tr>
        `).join("");

        tbody.querySelectorAll<HTMLButtonElement>("[data-action='delete-book']").forEach(btn => {
            btn.addEventListener("click", () => this.delete(btn.dataset.id!));
        });
    }

    private delete(id: string): void {
        if (!confirm("¿Eliminar este libro?")) return;
        try {
            this.books.delete(id);
            this.toast("Libro eliminado.", "success");
            this.render();
            this.onChanged();
        } catch (err: any) {
            this.toast(err.message, "error");
        }
    }
}
