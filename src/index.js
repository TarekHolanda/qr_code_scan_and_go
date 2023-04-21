import React from "react";
import ReactDOM from "react-dom/client";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas"
import "./index.css";
import logo from "./img/hc_logo_black.png";
// import { createUseStyles } from "react-jss"
// import DEV_RAINBOW_LOGO from "./img/hc_logo_black.png"
// import DEV_RAINBOW_BG from "./img/hc_logo_black.png"

const TYPES = {
    CHECKLIST: 1,
    CREW: 2,
    CROP: 3,
    EQUIPMENT: 4,
    LOCATION: 5,
    QRCODE_LABEL: 6,
};

// const ICON_SIZE = 100;

/* const useStyles = createUseStyles(theme => ({
  root: {
    backgroundImage: `url('${DEV_RAINBOW_BG}')`,
    maxWidth: 1060,
    maxHeight: 1521,
    borderRadius: "32px",
    border: "5px solid #EFEFF7",
    padding: theme.spacing(11),
  },
  logo: {
    boxShadow: "9px 3px 20px 1px rgb(0 0 0 / 10%)",
    height: 150,
    width: 150,
    borderRadius: 8,
  },
  icon: {
    borderRadius: 8,
    width: ICON_SIZE,
    height: ICON_SIZE,
    position: "absolute",
    // Need to offset the values due to `excavate: true` in qrcode.react
    top: `calc(50% - ${ICON_SIZE / 2 + 1}px)`,
    // Need to offset the values due to `excavate: true` in qrcode.react
    left: `calc(50% - ${ICON_SIZE / 2 - 5}px)`,
  },
  qrContainer: {
    position: "relative",
    backgroundColor: "#EFEFF7",
    borderRadius: "56px",
    margin: theme.spacing(8, 0),
    padding: theme.spacing(4),
  },
  qrInner: {
    backgroundColor: "white",
    borderRadius: "32px",
    padding: 90,
  },
  referredBy: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "24px",
    lineHeight: "29px",
    letterSpacing: "0.1em",
  },
})) */

const getCanvas = () => {
    const qr = document.getElementById("qr-code-template")
    
    if (!qr) {
        return;
    }

    return html2canvas(qr, {
        onclone: snapshot => {
            const qrElement = snapshot.getElementById("qr-code-template")
            
            if (!qrElement) {
                return;
            }
            
            // Make element visible for cloning
            qrElement.style.display = "block";
            qrElement.style.padding = "4px 8px 4px 8px";
            qrElement.style.border = "8px solid black";
            qrElement.style.borderRadius = "1px";
            qrElement.style.boxSizing = "border-box";
            qrElement.style.margin = "10px 0px 100px 500px";
            // qrElement.style.transform  = "translate(1)";
            // qrElement.style.backgroundImage = `url(${logo})`;
        },
    })
}

const downloadQRCode = async (qrCodeLabel) => {
    const canvas = await getCanvas()
    
    if (!canvas) {
        throw new Error("<canvas> not found in DOM");
    }
    console.log(qrCodeLabel)

    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    console.log(1)
    const downloadLink = document.createElement("a");
    console.log(2)
    downloadLink.href = pngUrl;
    console.log(3)
    downloadLink.download = (qrCodeLabel || "QR Code") + ".png";
    console.log(4)
    document.body.appendChild(downloadLink);
    console.log(5)
    downloadLink.click();
    console.log(6)
    document.body.removeChild(downloadLink);
    console.log(7)
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checklist: "",
            crew: "",
            crop: "",
            equipment: "",
            qrCodeLabel: "",
        };
    }

    handleChange(e, type) {
        const value = e.target.value;

        if (type === TYPES.CHECKLIST) {
            this.setState({
                checklist: parseInt(value)
            });
        }

        if (type === TYPES.CREW) {
            this.setState({
                crew: parseInt(value)
            });
        }

        if (type === TYPES.CROP) {
            this.setState({
                crop: parseInt(value)
            });
        }

        if (type === TYPES.EQUIPMENT) {
            this.setState({
                equipment: parseInt(value)
            });
        }

        if (type === TYPES.QRCODE_LABEL) {
            this.setState({
                qrCodeLabel: parseInt(value)
            });
        }
    }

    download(data) {
        console.log(data);
        const qrCodeURL = document.getElementById("qr-code-in")
        // .toDataURL("image/png").replace("image/png", "image/octet-stream");
        console.log(qrCodeURL)
        /* let aEl = document.createElement("a");
        aEl.href = qrCodeURL;
        aEl.download = "QR_Code.png";
        document.body.appendChild(aEl);
        aEl.click();
        document.body.removeChild(aEl); */
        var svgData = document.getElementById("qr-code-in").outerHTML;
        var svgBlob = new Blob([svgData], {type:"image/svg+xml;charset=utf-8"});
        var svgUrl = URL.createObjectURL(svgBlob);
        var downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = "newesttree.svg";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    render() {
        const checklist = this.state.checklist;
        const crew = this.state.crew;
        const crop = this.state.crop;
        const equipment = this.state.equipment;
        const qrCodeLabel = this.state.qrCodeLabel;
        console.log(this.state);
        
        let qrCodeLabelDiv;
        if (qrCodeLabel) {
            qrCodeLabelDiv = <div className="qr-code-label">{qrCodeLabel}</div>;
        } else {
            qrCodeLabelDiv = <div className="qr-code-label">QR Code</div>;
        }

        let data = JSON.stringify({
            "action": "START_REPORT",
            "module": "INSPECTOR",
            "data": {
                "pestCategory": checklist, // 539
                "crew": crew,
                "cropVariety": crop,
                "equipment": equipment,
                "locations": []
            }
        });

        return (
            <div className="home">
                <div className="input-row">
                    <div className="input-label">
                        Checklist ID
                    </div>

                    <input
                        type="text"
                        placeholder="Checklist ID"
                        className="input"
                        value={checklist}
                        onChange={(e) => this.handleChange(e, TYPES.CHECKLIST)}
                    />
                </div>
                
                <div className="input-row">
                    <div className="input-label">
                        Crew ID
                    </div>
                    <input
                        type="text"
                        placeholder="Crew ID"
                        className="input"
                        value={crew}
                        onChange={(e) => this.handleChange(e, TYPES.CREW)}
                    />
                </div>

                <div className="input-row">
                    <div className="input-label">
                        Crop Variety ID
                    </div>
                    <input
                        type="text"
                        placeholder="Crop Variety ID"
                        className="input"
                        value={crop}
                        onChange={(e) => this.handleChange(e, TYPES.CROP)}
                    />
                </div>

                <div className="input-row">
                    <div className="input-label">
                        Crew ID
                    </div>
                    <input
                        type="text"
                        placeholder="Equipment ID"
                        className="input"
                        value={equipment}
                        onChange={(e) => this.handleChange(e, TYPES.EQUIPMENT)}
                    />
                </div>

                <div className="input-row">
                    <div className="input-label">
                        QR Code Label
                    </div>
                    <input
                        type="text"
                        placeholder="Equipment ID"
                        className="input"
                        value={qrCodeLabel}
                        onChange={(e) => this.handleChange(e, TYPES.QRCODE_LABEL)}
                    />
                </div>
                
                <div id="qr-code-template">
                    <div>
                        {qrCodeLabelDiv}
                        <div>
                            <QRCode
                                size={256}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                value={data}
                                title="HeavyConnect - Scan and Go"
                                viewBox={`0 0 256 256`}
                            />
                        </div>
                        <img alt="logo" src={logo} className="qr-code-logo" />
                    </div>
                </div>

                {/*
                <div className="qr-code">
                    <QRCode
                        id="qr-code-in"
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={data}
                        title="TEST TEST"
                        viewBox={`0 0 256 256`}
                    />
                </div>
                <button onClick={() => this.download(data)}>
                    Download QR Code
                </button>
                */}

                <button onClick={() => downloadQRCode(qrCodeLabel)}>
                    Download Canvas
                </button>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Home />);
