import axios from "axios";

async function fetchwaether(Type: string) {
    let res;
    if (Type == "today") {
        res = await axios.get(
            `http://code418back.powerinmd.com/api/v1/weather/today`
        )
    } else {
        res = await axios.get(
            `http://code418back.powerinmd.com/api/v1/weather/week`
        )
    }
    return res.data;
}

export default async function GetWeather() {
    let json = await fetchwaether("today");
    json.weekly = [... await fetchwaether("week")];
    return json;
}