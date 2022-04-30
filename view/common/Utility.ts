export type Size = "lg" | "md" | "sm";
export type Color = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
export type ButtonType = Color | "link";

export const stringToHashCode = (str: string) => {
    // string 값을 hash code로 변환
    let h = 0;

    if (str.length > 0) {
        for (let i = 0; i < str.length; i++) {
            h = 31 * h + str.charCodeAt(i);

            h |= 0;
        }
    }
    return h.toString();
}

export const alert = (message: string, type?: Color, time?: number) => {
    // alert 출력
    if (typeof document !== "undefined") {
        // alert을 출력할 container 가져오기
        const container = document.getElementById("alertContainer");

        if (container !== null) {
            const color = type ?? "primary";
            const timeout = time ?? 5000;

            // container에 alert을 출력
            container.innerHTML =
`<div id="alert" class="alert alert-${color} alert-dismissible" role="alert" style="transition:0.5s">
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"/>
</div>`;

            // timeout이 설정되어 있을 경우 시간 경과 후 자동으로 alert 닫기
            if (time !== 0) {
                const timer = setTimeout(() => {
                    container.innerHTML = "";
                }, timeout);

                // alert을 수동으로 닫았을 경우 clearTimeout을 통해 timeout 취소
                const alertEl = document.getElementById("alert");
                if(alertEl !== null) {
                    alertEl.addEventListener("closed.bs.alert", () => {
                        clearTimeout(timer);
                    });
                }
            }
        }
    }
}