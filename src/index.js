import React from "react";
import ReactDOM from "react-dom/client";
import QRCode from "react-qr-code";
import "./index.css";
import logo from "./img/hc_logo_black.png";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import { formatData } from "./formatData";
import { downloadQRCode } from "./downloadQRCode";

const TYPES = {
    CHECKLIST: 1,
    CREW: 2,
    CROP: 3,
    EQUIPMENT: 4,
    LOCATION: 5,
    QUESTION: 6,
    QRCODE_LABEL: 7,
};

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
                qrCodeLabel: value || ""
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
            qrCodeLabelDiv = <div className="qr-code-label max-width-512 line-break">{qrCodeLabel}</div>;
        } else {
            qrCodeLabelDiv = <div className="qr-code-label">QR Code</div>;
        }

        let data = JSON.stringify(formatData(checklist, crew, crop, equipment, [], []));

        return (
            <div className="home">
                <div className="col-left">
                    <div className="text-32">
                        HeavyConnect
                    </div>

                    <div className="text-24">
                        Scan & Go - QR Code Generator
                    </div>

                    <div className="space-vertical-20">
                    </div>

                    <div className="input-row">
                        <div className="input-label">
                            Checklist ID
                        </div>

                        <Form.Control
                            type="number"
                            placeholder="Checklist ID"
                            className="width-70"
                            value={checklist}
                            onChange={(e) => this.handleChange(e, TYPES.CHECKLIST)}
                        />
                    </div>

                    <div className="space-vertical-16">
                    </div>
                    
                    <div className="input-row">
                        <div className="input-label">
                            Crew ID
                        </div>

                        <Form.Control
                            type="number"
                            placeholder="Crew ID"
                            className="width-70"
                            value={crew}
                            onChange={(e) => this.handleChange(e, TYPES.CREW)}
                        />
                    </div>

                    <div className="space-vertical-16">
                    </div>

                    <div className="input-row">
                        <div className="input-label">
                            Crop Variety ID
                        </div>

                        <Form.Control
                            type="number"
                            placeholder="Crop Variety ID"
                            className="width-70"
                            value={crop}
                            onChange={(e) => this.handleChange(e, TYPES.CROP)}
                        />
                    </div>

                    <div className="space-vertical-16">
                    </div>

                    <div className="input-row">
                        <div className="input-label">
                            Equipment ID
                        </div>

                        <Form.Control
                            type="number"
                            placeholder="Equipment ID"
                            className="width-70"
                            value={equipment}
                            onChange={(e) => this.handleChange(e, TYPES.EQUIPMENT)}
                        />
                    </div>

                    <div className="space-vertical-16">
                    </div>

                    <div className="input-row">
                        <div className="input-label">
                            QR Code Label
                        </div>

                        <Form.Control
                            type="text"
                            placeholder="QR Code"
                            className="width-70"
                            value={qrCodeLabel}
                            onChange={(e) => this.handleChange(e, TYPES.QRCODE_LABEL)}
                        />
                    </div>

                    <button onClick={() => downloadQRCode(qrCodeLabel)} className="glow-on-hover">
                        Download Canvas
                    </button>
                </div>
                
                <div id="qr-code-template" className="col-right">
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
                    </div>
                </div>

                <img alt="logo" src={logo} className="logo logo-right" />
                <img alt="logo" src={logo} className="logo logo-left" />
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Home />);
