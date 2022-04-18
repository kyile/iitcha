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