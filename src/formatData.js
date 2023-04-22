export function formatData(checklist, crew, crop, equipment, locations, questions) {
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
        dataTemp.data.locations = locations;
    }

    if (questions.length) {
        dataTemp.data.questions = questions;
    }

    return dataTemp;
}
