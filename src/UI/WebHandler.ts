import { LibrarySystem } from "../core/LibrarySystem";
import { BooksSection } from "./sections/BooksSection";
import { StudentsSection } from "./sections/StudentsSection";
import { LoansSection } from "./sections/LoansSection";
import { AuthGuard } from "./auth/AuthGuard";
import { LoginHandler } from "./auth/LoginHandler";
import "./View/web/styles/index.scss";

export class WebHandler {
    private booksSection!: BooksSection;
    private studentsSection!: StudentsSection;
    private loansSection!: LoansSection;
    private auth = new AuthGuard();

    constructor(private library: LibrarySystem) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => this.boot());
        } else {
            this.boot();
        }
    }

    private boot(): void {
        if (this.auth.isAuthenticated()) {
            this.showApp();
        } else {
            this.showLogin();
        }
    }

    private showLogin(): void {
        document.getElementById("login-screen")!.hidden = false;
        document.getElementById("app-screen")!.hidden = true;

        new LoginHandler(this.auth, () => {
            document.getElementById("login-screen")!.hidden = true;
            this.showApp();
        }).setup();
    }

    private showApp(): void {
        document.getElementById("app-screen")!.hidden = false;
        document.getElementById("login-screen")!.hidden = true;

        document.getElementById("btn-logout")?.addEventListener("click", () => {
            this.auth.logout();
            location.reload();
        });

        this.init();
    }

    private init(): void {
        const toast = this.toast.bind(this);

        this.booksSection = new BooksSection(
            this.library.books,
            () => this.loansSection.render(),
            toast,
        );
        this.studentsSection = new StudentsSection(
            this.library.students,
            toast,
        );
        this.loansSection = new LoansSection(
            this.library,
            () => this.booksSection.render(),
            toast,
        );

        this.setupNav();
        this.booksSection.setup();
        this.booksSection.render();
        this.studentsSection.setup();
        this.studentsSection.render();
        this.loansSection.setup();
        this.loansSection.render();
    }

    private setupNav(): void {
        document
            .querySelectorAll<HTMLButtonElement>(".nav-btn")
            .forEach((btn) => {
                btn.addEventListener("click", () => {
                    document
                        .querySelectorAll<HTMLElement>(".section")
                        .forEach((s) => {
                            s.hidden = !s.id.endsWith(btn.dataset.section!);
                        });
                    document
                        .querySelectorAll(".nav-btn")
                        .forEach((b) => b.classList.remove("active"));
                    btn.classList.add("active");
                });
            });
    }

    private toast(msg: string, type: "success" | "error"): void {
        const container = document.getElementById("toast")!;
        const div = document.createElement("div");
        div.className = `toast-msg toast-${type}`;
        div.textContent = msg;
        container.appendChild(div);
        setTimeout(() => div.remove(), 3500);
    }
}
