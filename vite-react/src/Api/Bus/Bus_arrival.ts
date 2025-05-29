// @ts-nocheck
import axios from "axios"
import keys from "./setup.json" with { type: "json" };

// 타입 정의
type AllData = {
    nodenm: string | string[];
    min1?: number;
    station1?: number;
    station2?: number;
    bstopidx?: number;
    bstopid?: string | number;
};

type BusItem = {
    busNo: string;
    allData: AllData;
};

type Stop = {
    name: string;
    eta?: number;
    routeDirection: "left" | "right";
};

type BusGroup = {
    title: string;
    message: string;
    stops: Stop[];
};

// 정류장 이름 변환 함수
function formatStopName(nodenm: string | string[]) {
    const name = Array.isArray(nodenm) ? nodenm.join(', ') : nodenm;
    if (name.includes('입구')) return '동의대\n입구';
    if (name.includes('자연대학')) return '자연대학';
    if (name.includes('도서관')) return '도서관';
    if (name.includes('본관')) return '본관';
    return name;
}

// 정렬 기준
const upOrder = ['동의대\n입구', '자연대학', '도서관', '본관'];
const downOrder = [...upOrder].reverse(); // ['본관', '도서관', '자연대학', '동의대\n입구']

// 정류장 정렬 및 routeDirection 부여 함수
function buildStops(stopsRaw, direction) {
    const order = direction === 'right' ? upOrder : downOrder;
    // 중복 제거 및 정렬
    const stopsMap = {};
    stopsRaw.forEach(stop => {
        const name = formatStopName(stop.name);
        // 가장 빠른 eta만 남기기 (중복 방지)
        if (!stopsMap[name] || (stop.eta !== undefined && stop.eta < stopsMap[name].eta)) {
            stopsMap[name] = {
                name,
                eta: stop.eta,
                routeDirection: direction
            };
        }
    });
    // 정렬
    return order
        .map(name => stopsMap[name] || { name, routeDirection: direction })
        .filter(stop => stop); // 필요시 존재하는 정류장만
}

// 버스 데이터 변환 함수
function transformBusData(data, direction) {
    // 버스 번호별로 그룹핑
    const busMap = {};
    data.forEach(item => {
        const busNo = item.busNo;
        if (!busMap[busNo]) {
            busMap[busNo] = {
                title: busNo,
                message: "운행중",
                stops: [],
            };
        }
        const stopName = formatStopName(item.allData.nodenm);
        const eta = item.allData.min1;
        busMap[busNo].stops.push({
            name: stopName,
            eta: eta,
            routeDirection: direction,
        });
    });

    // 각 버스별로 정류장 정렬 및 routeDirection 부여
    return Object.values(busMap).map(bus => {
        return {
            title: bus.title,
            message: bus.message,
            stops: buildStops(bus.stops, direction),
        };
    });
}

// 메인 함수
export default async function All_Bus() {
    const result = await axios.get("http://code418back.powerinmd.com/api/v1/bus/stop/arrival?stopId=all");

    let up_json = [], down_json = [];
    for (let key = 0; key < keys.length; key++) {
        for (let index = 0; index < result.data.length; index++) {
            if (result.data[index].allData.bstopid == keys[key].up) {
                up_json.push(result.data[index]);
            } else if (result.data[index].allData.bstopid == keys[key].down) {
                down_json.push(result.data[index]);
            }
        }
    }

    // up은 right, down은 left
    const upBusList = transformBusData(up_json, 'right');
    const downBusList = transformBusData(down_json, 'left');

    // up, down을 합침 (버스 노선별로 합치려면 아래처럼)
    const busMap = {};

    [...upBusList, ...downBusList].forEach(bus => {
        if (!busMap[bus.title]) {
            busMap[bus.title] = {
                title: bus.title,
                message: bus.message,
                stops: [],
            };
        }
        // stops를 routeDirection 기준으로 병합
        bus.stops.forEach(stop => {
            // 같은 정류장이 이미 있으면 eta가 더 빠른 걸 남김
            const idx = busMap[bus.title].stops.findIndex(s => s.name === stop.name && s.routeDirection === stop.routeDirection);
            if (idx === -1) {
                busMap[bus.title].stops.push(stop);
            } else {
                // eta가 더 빠른 걸로 갱신
                if (stop.eta !== undefined && (busMap[bus.title].stops[idx].eta === undefined || stop.eta < busMap[bus.title].stops[idx].eta)) {
                    busMap[bus.title].stops[idx] = stop;
                }
            }
        });
    });

    // 각 버스별 stops을 upOrder/right 또는 downOrder/left 순서로 정렬
    const resultList = Object.values(busMap).map(bus => {
        // right/left를 모두 포함한 stops 정렬
        const rightStops = buildStops(bus.stops.filter(s => s.routeDirection === 'right'), 'right');
        const leftStops = buildStops(bus.stops.filter(s => s.routeDirection === 'left'), 'left');
        // 원하는 순서대로 합침 (right 먼저, left 뒤에)
        return {
            title: bus.title,
            message: bus.message,
            stops: [...rightStops, ...leftStops],
        };
    });

    return resultList;
}