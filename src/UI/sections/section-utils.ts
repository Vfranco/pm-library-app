/**
 * Utilidades compartidas por todas las secciones de la UI web.
 * Centraliza helpers que de otro modo se duplicarían en cada sección.
 */

/** Obtiene un elemento del DOM por ID o lanza un error descriptivo. */
export function el<T extends HTMLElement = HTMLElement>(id: string): T {
    const element = document.getElementById(id) as T | null;
    if (!element) throw new Error(`Section: #${id} no encontrado en el DOM.`);
    return element;
}

/** Lee y limpia el valor de un input o select por ID. */
export function val(id: string): string {
    return (el<HTMLInputElement>(id).value ?? "").trim();
}

/** Escapa texto para inserción segura en innerHTML (previene XSS). */
export function esc(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}
