import { getCanvas } from "./getCanvas";

export async function downloadQRCode(qrCodeLabel) {
    const canvas = await getCanvas();

    if (!canvas) {
        throw new Error("<canvas> not found in DOM");
    }

    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = (qrCodeLabel || "QR Code") + ".png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}
