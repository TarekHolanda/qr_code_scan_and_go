import html2canvas from "html2canvas";

export function getCanvas() {
    const qr = document.getElementById("qr-code-template");

    if (!qr) {
        return;
    }

    return html2canvas(qr, {
        onclone: snapshot => {
            const qrElement = snapshot.getElementById("qr-code-template");
            const borderOutElement = snapshot.getElementById("border-out");
            const borderInElement = snapshot.getElementById("border-in");

            if (!qrElement || !borderOutElement || !borderInElement) {
                return;
            }

            qrElement.style.display = "block";
            borderOutElement.style.boxSizing = "border-box";
            borderOutElement.style.border = "4px solid black";

            borderInElement.style.boxSizing = "border-box";
            borderInElement.style.borderLeft = "0px solid black";
            borderInElement.style.borderRight = "0px solid black";
            borderInElement.style.borderTop = "1px solid black";
            borderInElement.style.borderBottom = "6px solid black";

            borderInElement.style.marginBottom = "-8px";
        },
    });
}
