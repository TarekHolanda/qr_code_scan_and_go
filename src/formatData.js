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
        dataTemp.data.locations = [];

        for (let i = 0; i < locations.length; i++) {
            dataTemp.data.locations.push({
                "level": "block",
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
