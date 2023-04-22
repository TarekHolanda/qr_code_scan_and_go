import React from "react";
import ReactDOM from "react-dom/client";
import QRCode from "react-qr-code";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faDownload } from '@fortawesome/free-solid-svg-icons'

import { formatData } from "./formatData";
import { downloadQRCode } from "./downloadQRCode";
import "./index.css";

import logo from "./img/hc_logo_black.png";

const TYPES = {
    CHECKLIST: 1,
    CREW: 2,
    CROP: 3,
    EQUIPMENT: 4,
    LOCATION: 5,
    LOCATION_LEVEL: 6,
    QUESTION_CODE: 7,
    QUESTION_ANSWER: 8,
    QRCODE_LABEL: 9,
};

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checklist: "",
            crew: "",
            crop: "",
            equipment: "",
            locations: [{
                level: null,
                id: "",
            }],
            questions: [{
                code: "",
                answer: "",
            }],
            qrCodeLabel: "",
        };
    }

    addLocation() {
        const currentLocations = this.state.locations;
        this.setState({
            locations: [...currentLocations, {
                level: null,
                id: ""
            }]
        });
    }

    addQuestion() {
        const currentQuestions = this.state.questions;
        this.setState({
            questions: [...currentQuestions, {
                code: "",
                answer: ""
            }]
        });
    }

    handleChange(e, type, index) {
        const value = e.target.value;
        const currentLocations = this.state.locations;
        const currentQuestions = this.state.questions;

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

        if (type === TYPES.LOCATION) {
            currentLocations[index] = {
                level: currentLocations[index].level,
                id: parseInt(value) || ""
            };

            this.setState({
                locations: [...currentLocations]
            });
        }

        if (type === TYPES.LOCATION_LEVEL) {
            if (value) {
                currentLocations[index] = {
                    level: value,
                    id: ""
                };
            } else {
                currentLocations[index] = {
                    level: null,
                    id: ""
                };
            }

            this.setState({
                locations: [...currentLocations]
            });
        }

        if (type === TYPES.QUESTION_CODE) {
            currentQuestions[index] = {
                code: parseInt(value) || "",
                answer: currentQuestions[index].answer,
            };

            this.setState({
                questions: [...currentQuestions]
            });
        }

        if (type === TYPES.QUESTION_ANSWER) {
            currentQuestions[index] = {
                code: currentQuestions[index].code,
                answer: value || "",
            };

            this.setState({
                questions: [...currentQuestions]
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
            qrCodeLabelDiv = <div className="qr-code-label">Fertilizer 23SB-1002</div>;
        }

        let locationsRender = [];
        for (let i = 0; i < locations.length; i++) {
            locationsRender.push(
                <div className="input-row margin-top-16" key={"level" + i}>
                    <div className="input-label">
                        Location Level
                    </div>

                    <Form.Select aria-label="Location Level" className="width-70" onChange={(e) => this.handleChange(e, TYPES.LOCATION_LEVEL, i)}>
                        <option value="">Location Level</option>
                        <option value="grower">Grower</option>
                        <option value="field">Field</option>
                        <option value="section">Section</option>
                        <option value="block">Block</option>
                    </Form.Select>
                </div>
            )

            if (locations[i].level) {
                locationsRender.push(
                    <div key={"id" + i}>
                        <div className="space-vertical-16">
                        </div>

                        <div className="input-row">
                            <div className="input-label">
                                {locations[i].level}
                            </div>

                            <div className="width-70 display-flex">
                                <Form.Control
                                    type="number"
                                    placeholder={locations[i].level}
                                    value={locations[i].id}
                                    onChange={(e) => this.handleChange(e, TYPES.LOCATION, i)}
                                />

                                {locations.length === (i + 1) && (locations[i].id) ? (
                                    <div className="display-flex">
                                        <div className="space-horizontal-8">
                                        </div>
                                        <Button variant="dark" onClick={() => this.addLocation()}>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </Button>
                                    </div>
                                ) : ""}
                            </div>
                        </div>
                    </div>
                );
            }
        }

        let questionsRender = [];
        for (let i = 0; i < questions.length; i++) {
            questionsRender.push(
                <div className="input-row margin-top-16" key={"code" + i}>
                    <div className="input-label">
                        Question Code
                    </div>

                    <Form.Control
                        type="number"
                        placeholder="Question Code"
                        value={questions[i].code}
                        onChange={(e) => this.handleChange(e, TYPES.QUESTION_CODE, i)}
                        className="width-70"
                    />
                </div>
            )

            questionsRender.push(
                <div key={"answer" + i}>
                    <div className="space-vertical-16">
                    </div>

                    <div className="input-row">
                        <div className="input-label">
                            Question Answer
                        </div>

                        <div className="width-70 display-flex">
                            <Form.Control
                                type="text"
                                placeholder="Question Answer"
                                value={questions[i].answer}
                                onChange={(e) => this.handleChange(e, TYPES.QUESTION_ANSWER, i)}
                            />

                            {questions.length === (i + 1) && (questions[i].code && questions[i].answer) ? (
                                <div className="display-flex">
                                    <div className="space-horizontal-8">
                                    </div>
                                    <Button variant="dark" onClick={() => this.addQuestion()}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </Button>
                                </div>
                            ) : ""}
                        </div>
                    </div>
                </div>
            );
        }

        let data = JSON.stringify(formatData(checklist, crew, crop, equipment, locations, questions));

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

                    {locationsRender}

                    {questionsRender}

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

                    <div className="space-vertical-16">
                    </div>

                    <Button variant="dark" onClick={() => downloadQRCode(qrCodeLabel)} className="display-flex margin-auto">
                        <FontAwesomeIcon icon={faDownload} className="padding-2" />
                        
                        <div className="space-horizontal-8">
                        </div>
                        
                        Download QR Code
                    </Button>
                </div>
                
                <div id="qr-code-template" className="margin-auto">
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
