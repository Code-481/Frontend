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

// 지정 노선 목록 (부산진구 접두사 포함)
const TARGET_ROUTES = ['6', '6-1', '9']; // 기본 노선 번호

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
        if (!stopsMap[name] || (stop.eta !== undefined && (stopsMap[name].eta === undefined || stop.eta < stopsMap[name].eta))) {
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
        .filter(stop => stop); // 존재하는 정류장만
}

// 노선 번호 추출 함수 (부산진구 접두사 제거)
function extractRouteNumber(busTitle: string): string {
    // "부산진구6" -> "6", "부산진구6-1" -> "6-1"
    const match = busTitle.match(/부산진구(.+)$/);
    return match ? match[1] : busTitle;
}

// 노선 번호 필터링 함수
function isTargetRoute(busTitle: string, targetRoutes: string[] = TARGET_ROUTES): boolean {
    const routeNumber = extractRouteNumber(busTitle);
    
    // 정확한 매칭
    if (targetRoutes.includes(routeNumber)) return true;
    
    // "번" 제거 후 매칭
    const normalizedRoute = routeNumber.replace(/번$/, '');
    if (targetRoutes.includes(normalizedRoute)) return true;
    
    return false;
}

// 버스 데이터 변환 함수
function transformBusData(data, direction, targetRoutes = TARGET_ROUTES) {
    // 버스 번호별로 그룹핑 (지정 노선만)
    const busMap = {};
    data.forEach(item => {
        const busTitle = item.busNo;
        
        // 지정 노선 필터링
        if (!isTargetRoute(busTitle, targetRoutes)) {
            return; // 지정 노선이 아니면 스킵
        }
        
        if (!busMap[busTitle]) {
            busMap[busTitle] = {
                title: busTitle,
                message: "운행중",
                stops: [],
            };
        }
        const stopName = formatStopName(item.allData.nodenm);
        const eta = item.allData.min1;
        busMap[busTitle].stops.push({
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

// 운행 상태 결정 함수
function determineOperationStatus(stops: Stop[]): string {
    // eta가 있는 정류장이 하나라도 있으면 운행중
    const hasEta = stops.some(stop => stop.eta !== undefined && stop.eta !== null);
    return hasEta ? "운행중" : "운행 종료";
}

// 메인 함수 (기본값: 지정 노선만)
export default async function All_Bus(targetRoutes = TARGET_ROUTES) {
    try {
        const result = await axios.get("http://code418back.powerinmd.com/api/v1/bus/stop/arrival?stopId=all");

        let up_json = [], down_json = [];
        for (let key = 0; key < keys.length; key++) {
            for (let index = 0; index < result.data.length; index++) {
                const busTitle = result.data[index].busNo;
                
                // 지정 노선 필터링 (API 호출 단계에서도 필터링)
                if (!isTargetRoute(busTitle, targetRoutes)) {
                    continue;
                }
                
                if (result.data[index].allData.bstopid == keys[key].up) {
                    up_json.push(result.data[index]);
                } else if (result.data[index].allData.bstopid == keys[key].down) {
                    down_json.push(result.data[index]);
                }
            }
        }

        // up은 right, down은 left
        const upBusList = transformBusData(up_json, 'right', targetRoutes);
        const downBusList = transformBusData(down_json, 'left', targetRoutes);

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
            const allStops = [...rightStops, ...leftStops];
            
            return {
                title: bus.title,
                message: determineOperationStatus(allStops), // 동적으로 운행 상태 결정
                stops: allStops,
            };
        });

        // 노선 번호 순으로 정렬
        resultList.sort((a, b) => {
            const getRouteNumber = (title) => extractRouteNumber(title);
            return getRouteNumber(a.title).localeCompare(getRouteNumber(b.title), undefined, { numeric: true });
        });

        // 데이터가 없으면 기본 구조 반환 (운행 종료 상태)
        if (resultList.length === 0) {
            return targetRoutes.map(route => ({
                title: `부산진구${route}`,
                message: "운행 종료",
                stops: upOrder.map(name => ({
                    name,
                    routeDirection: "right"
                }))
            }));
        }

        return resultList;
        
    } catch (error) {
        console.error('버스 데이터 조회 중 오류 발생:', error);
        
        // 에러 시 기본 구조 반환
        return targetRoutes.map(route => ({
            title: `부산진구${route}`,
            message: "운행 종료",
            stops: upOrder.map(name => ({
                name,
                routeDirection: "right"
            }))
        }));
    }
}

// 특정 노선만 조회하는 헬퍼 함수들
export async function getBusRoute6() {
    return await All_Bus(['6']);
}

export async function getBusRoute6_1() {
    return await All_Bus(['6-1']);
}

export async function getBusRoute9() {
    return await All_Bus(['9']);
}

export async function getMultipleRoutes(routes: string[]) {
    return await All_Bus(routes);
}

// 모든 노선 조회 (필터링 없음)
export async function getAllRoutes() {
    return await All_Bus(null);
}
