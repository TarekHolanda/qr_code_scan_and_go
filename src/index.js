import React from "react";
import ReactDOM from "react-dom/client";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas"
import "./index.css";
import logo from "./img/hc_logo_black.png";

const TYPES = {
    CHECKLIST: 1,
    CREW: 2,
    CROP: 3,
    EQUIPMENT: 4,
    LOCATION: 5,
    QUESTION: 6,
    QRCODE_LABEL: 7,
};

const getCanvas = () => {
    const qr = document.getElementById("qr-code-template")
    
    if (!qr) {
        return;
    }

    return html2canvas(qr, {
        onclone: snapshot => {
            const qrElement = snapshot.getElementById("qr-code-template");
            const borderOutElement = snapshot.getElementById("border-out");
            const borderInElement = snapshot.getElementById("border-in")
            
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
    })
}

const downloadQRCode = async (qrCodeLabel) => {
    const canvas = await getCanvas()
    
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

const downloadSVG = async (data) => {
    const qrCodeURL = document.getElementById("qr-code-in")
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

const formatData = (checklist, crew, crop, equipment, locations, questions) => {
    let dataTemp = {
        "action": "START_REPORT",
        "module": "INSPECTOR",
        "data": {}
    };

    if (checklist) {
        dataTemp.data.pestCategory = checklist;
    }

    if (crew) {
        dataTemp.data.crew = crew;
    }

    if (crop) {
        dataTemp.data.crop = crop;
    }

    if (equipment) {
        dataTemp.data.equipment = equipment;
    }

    if (locations.length) {
        dataTemp.data.locations = [];

        for (let i = 0; i < locations.length; i++) {
            dataTemp.data.locations.push({
                "level": "block", // level (block, section, field)
                "id": 123 // location id 
            });
        } 
    }

    if (questions.length) {
        dataTemp.data.questions = [];

        for (let i = 0; i < questions.length; i++) {
            dataTemp.data.questions.push({
                "code": 123,
                "answer": "Yes"
            });
        } 
    }

    return dataTemp;
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checklist: "",
            crew: "",
            crop: "",
            equipment: "",
            locations: [],
            questions: [],
            qrCodeLabel: "",
        };
    }

    handleChange(e, type) {
        const value = e.target.value;

        if (type === TYPES.CHECKLIST) {
            this.setState({
                checklist: parseInt(value) || ""
            });
        }

        if (type === TYPES.CREW) {
            this.setState({
                crew: parseInt(value) || ""
            });
        }

        if (type === TYPES.CROP) {
            this.setState({
                crop: parseInt(value) || ""
            });
        }

        if (type === TYPES.EQUIPMENT) {
            this.setState({
                equipment: parseInt(value) || ""
            });
        }

        if (type === TYPES.QRCODE_LABEL) {
            this.setState({
                qrCodeLabel: parseInt(value) || ""
            });
        }
    }

    render() {
        const checklist = this.state.checklist;
        const crew = this.state.crew;
        const crop = this.state.crop;
        const equipment = this.state.equipment;
        const locations = this.state.locations;
        const questions = this.state.questions;
        const qrCodeLabel = this.state.qrCodeLabel;
        
        let qrCodeLabelDiv;
        if (qrCodeLabel) {
            qrCodeLabelDiv = <div className="qr-code-label">{qrCodeLabel}</div>;
        } else {
            qrCodeLabelDiv = <div className="qr-code-label">QR Code</div>;
        }

        let data = JSON.stringify(formatData(checklist, crew, crop, equipment, [], []));

        return (
            <div className="home">
                <div className="title1">
                    HeavyConnect
                </div>

                <div className="title2">
                    Scan & Go - QR Code Generator
                </div>

                <div className="space-vertical-lg">
                </div>

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
                        onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
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
                        onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
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
                        onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
                    />
                </div>

                <div className="input-row">
                    <div className="input-label">
                        Equipment ID
                    </div>
                    <input
                        type="text"
                        placeholder="Equipment ID"
                        className="input"
                        value={equipment}
                        onChange={(e) => this.handleChange(e, TYPES.EQUIPMENT)}
                        onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
                    />
                </div>

                <div className="input-row">
                    <div className="input-label">
                        QR Code Label
                    </div>
                    <input
                        type="text"
                        placeholder="QR Code"
                        className="input"
                        value={qrCodeLabel}
                        onChange={(e) => this.handleChange(e, TYPES.QRCODE_LABEL)}
                    />
                </div>

                <div className="space-vertical-lg">
                </div>
                
                <div id="qr-code-template">
                    <div id="border-out" className="border-out">
                        <div>
                            <QRCode
                                size={512}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                value={data}
                                title="HeavyConnect - Scan and Go"
                                viewBox={`0 0 256 256`}
                                className="border-in"
                                id="border-in"
                            />
                            {qrCodeLabelDiv}
                        </div>
                        {/*<img alt="logo" src={logo} className="qr-code-logo" />*/}
                    </div>
                </div>

                <button onClick={() => downloadQRCode(qrCodeLabel)} className="glow-on-hover">
                    Download Canvas
                </button>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Home />);
