import { StudentService } from "../../core/services/StudentService";
import { el, val, esc } from "./section-utils";

export class StudentsSection {

    constructor(
        private students: StudentService,
        private toast: (msg: string, type: "success" | "error") => void
    ) {}

    setup(): void {
        const btnOpen   = el("btn-open-add-student");
        const btnCancel = el("btn-cancel-add-student");
        const formCard  = el("form-add-student");
        const form      = el<HTMLFormElement>("add-student-form");

        btnOpen.addEventListener("click", () => {
            formCard.hidden = false;
            el<HTMLInputElement>("student-name").focus();
        });

        btnCancel.addEventListener("click", () => {
            formCard.hidden = true;
            form.reset();
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            try {
                this.students.register(val("student-name"), val("student-id"));
                this.toast("Estudiante registrado correctamente.", "success");
                form.reset();
                formCard.hidden = true;
                this.render();
            } catch (err: any) {
                this.toast(err.message, "error");
            }
        });
    }

    render(): void {
        const tbody = el("students-tbody");
        const all   = this.students.getAll();

        if (all.length === 0) {
            tbody.innerHTML = `<tr class="empty-row"><td colspan="3">No hay estudiantes registrados.</td></tr>`;
            return;
        }

        tbody.innerHTML = all.map(s => `
            <tr>
                <td><code>${s.id}</code></td>
                <td>${esc(s.name)}</td>
                <td><div class="actions-cell">
                    <button class="btn btn-danger btn-sm" data-action="delete-student" data-id="${s.id}">Eliminar</button>
                </div></td>
            </tr>
        `).join("");

        tbody.querySelectorAll<HTMLButtonElement>("[data-action='delete-student']").forEach(btn => {
            btn.addEventListener("click", () => this.delete(btn.dataset.id!));
        });
    }

    private delete(id: string): void {
        if (!confirm("¿Eliminar este estudiante?")) return;
        try {
            this.students.delete(id);
            this.toast("Estudiante eliminado.", "success");
            this.render();
        } catch (err: any) {
            this.toast(err.message, "error");
        }
    }
}
