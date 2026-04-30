import { AuthGuard } from "./AuthGuard";

export class LoginHandler {

    constructor(
        private auth: AuthGuard,
        private onSuccess: () => void
    ) {}

    setup(): void {
        const form  = this.el<HTMLFormElement>("login-form");
        const error = this.el("login-error");

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            error.hidden = true;

            const ok = this.auth.login(
                this.val("login-username"),
                this.val("login-password")
            );

            if (ok) {
                this.onSuccess();
            } else {
                error.hidden = false;
                this.el<HTMLInputElement>("login-password").value = "";
                this.el<HTMLInputElement>("login-password").focus();
            }
        });
    }

    private el<T extends HTMLElement = HTMLElement>(id: string): T {
        const el = document.getElementById(id) as T | null;
        if (!el) throw new Error(`LoginHandler: #${id} no encontrado.`);
        return el;
    }

    private val(id: string): string {
        return (this.el<HTMLInputElement>(id).value ?? "").trim();
    }
}
