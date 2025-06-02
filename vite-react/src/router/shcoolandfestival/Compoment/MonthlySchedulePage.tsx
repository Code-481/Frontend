import  { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format, isSameDay } from "date-fns"; // isSameDay 추가
import { getMonthlyEvents } from "@/Api/school/scheduleUtils";

const API_URL = "http://code418back.powerinmd.com/api/v1/academic-schedule";

type ParsedEvent = {
  title: string;
  start: Date;
  end: Date;
};

export default function MonthlySchedulePage() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(today);
  const [events, setEvents] = useState<ParsedEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("데이터를 불러오지 못했습니다.");
        const data = await res.json();
        const juneEvents = getMonthlyEvents(data, 6); // 6월 일정
        setEvents(juneEvents);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // 날짜별 이벤트 매핑
  const eventsByDate: Record<string, string[]> = {};
  events.forEach((ev) => {
    let d = new Date(ev.start);
    while (d <= ev.end) {
      const key = format(d, "yyyy-MM-dd");
      if (!eventsByDate[key]) eventsByDate[key] = [];
      eventsByDate[key].push(ev.title);
      // date-fns에서 addDays를 사용하거나 직접 날짜를 더합니다.
      const nextDay = new Date(d);
      nextDay.setDate(d.getDate() + 1);
      d = nextDay;
    }
  });

  return (
    <div className="">
      <h2 className="text-xl font-bold mb-4">2025년 6월 학사일정</h2>
      {loading && <div>불러오는 중...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && (
        <>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={new Date(2025, 5, 1)} // 6월로 고정
            onMonthChange={() => {}} // 월 변경 방지
            className="rounded-md border mb-6"
            components={{
              // React DayPicker의 components API 활용 [4]
              Day: ({ date }) => {
                const key = format(date, "yyyy-MM-dd");
                const hasEvent = !!eventsByDate[key];
                const isCurrentMonth =
                  date.getMonth() === new Date(2025, 5, 1).getMonth();

                // 현재 월의 날짜가 아니면 스타일 적용 안 함
                if (!isCurrentMonth) {
                  return (
                    <div className="text-muted-foreground opacity-50 p-2 h-9 w-9">
                      {date.getDate()}
                    </div>
                  );
                }

                return (
                  <div
                    className={`
                      p-2 h-9 w-9 flex items-center justify-center rounded-md
                      ${hasEvent ? "bg-amber-200 text-amber-800" : ""}
                      ${
                        isSameDay(date, selectedDate || new Date(0))
                          ? "bg-primary text-primary-foreground"
                          : ""
                      }
                      ${
                        !isSameDay(date, selectedDate || new Date(0)) &&
                        hasEvent
                          ? "hover:bg-amber-300"
                          : ""
                      }
                      ${
                        !isSameDay(date, selectedDate || new Date(0)) &&
                        !hasEvent
                          ? "hover:bg-accent hover:text-accent-foreground"
                          : ""
                      }
                    `}
                  >
                    {date.getDate()}
                  </div>
                );
              },
            }}
          />
          <ul className="mt-4 space-y-2">
            {events.length === 0 && (
              <li className="text-gray-500">이번 달 학사일정이 없습니다.</li>
            )}
            {events.map((ev, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="font-mono text-sm text-blue-600">
                  {ev.start.getDate() === ev.end.getDate()
                    ? format(ev.start, "M월 d일")
                    : `${format(ev.start, "M월 d일")} ~ ${format(
                        ev.end,
                        "M월 d일"
                      )}`}
                </span>
                <span>{ev.title}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
