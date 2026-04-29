import { ADMIN_CREDENTIALS } from "./auth.config";

const SESSION_KEY = "library_auth";

export class AuthGuard {

    login(username: string, password: string): boolean {
        const ok = username === ADMIN_CREDENTIALS.username
                && password === ADMIN_CREDENTIALS.password;
        if (ok) sessionStorage.setItem(SESSION_KEY, "1");
        return ok;
    }

    logout(): void {
        sessionStorage.removeItem(SESSION_KEY);
    }

    isAuthenticated(): boolean {
        return sessionStorage.getItem(SESSION_KEY) === "1";
    }
}
