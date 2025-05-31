import axios from "axios";
export async function Fast_API() {
    const res = await axios.get(
        `http://code418back.powerinmd.com/api/v1/festival/info`
    );
    return res.data;
}