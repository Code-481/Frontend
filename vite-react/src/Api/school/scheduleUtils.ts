type RawEvent = {
  date: string; // e.g., "6월 3일" or "6월 17일 ~ 6월 23일"
  event: string;
};

type ScheduleData = {
  year: number;
  monthlySchedule: Record<string, RawEvent[]>;
};

type ParsedEvent = {
  title: string;
  start: Date;
  end: Date;
};

function parseKoreanDate(dateStr: string, year: number): [Date, Date] {
  // "6월 3일" 또는 "6월 17일 ~ 6월 23일" 형태 처리
  if (dateStr.includes("~")) {
    const [startStr, endStr] = dateStr.split("~").map(s => s.trim());
    const [startMonth, startDay] = startStr.match(/\d+/g)!.map(Number);
    let [endMonth, endDay] = endStr.match(/\d+/g)!.map(Number);

    // endMonth가 없는 경우, startMonth와 동일하게 처리
    if (!endStr.includes("월")) endMonth = startMonth;

    const start = new Date(year, startMonth - 1, startDay);
    const end = new Date(year, endMonth - 1, endDay);
    return [start, end];
  } else {
    const [month, day] = dateStr.match(/\d+/g)!.map(Number);
    const date = new Date(year, month - 1, day);
    return [date, date];
  }
}

export function getMonthlyEvents(
  scheduleData: ScheduleData,
  targetMonth: number // 1~12
): ParsedEvent[] {
  const { year, monthlySchedule } = scheduleData;
  const monthKey = `${targetMonth}월`;
  const events = monthlySchedule[monthKey] || [];
  return events.map(ev => {
    const [start, end] = parseKoreanDate(ev.date, year);
    return {
      title: ev.event,
      start,
      end,
    };
  });
}
