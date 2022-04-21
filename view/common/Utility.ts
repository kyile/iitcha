export type Size = "lg" | "md" | "sm";
export type Color = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
export type ButtonType = Color | "link";

export const stringToHashCode = (str: string) => {
    let h = 0;

    if (str.length > 0) {
        for (let i = 0; i < str.length; i++) {
            h = 31 * h + str.charCodeAt(i);

            h |= 0;
        }
    }
    return h.toString();
}

export const alert = (message: string, type?: Color) => {
    const color = type ?? "primary";

    if (typeof document !== "undefined") {
        const container = document.getElementById("alertContainer");

        if (container !== null) {
            container.innerHTML =
`<div class="alert alert-${color} alert-dismissible" role="alert" style="transition:0.5s">
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"/>
</div>`;
        }
    }
}