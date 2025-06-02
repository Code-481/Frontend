import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { getMonthlyEvents } from "@/Api/school/scheduleUtils";

const API_URL = "http://code418back.powerinmd.com/api/v1/academic-schedule";

type ParsedEvent = {
  title: string;
  start: Date;
  end: Date;
};

function monthlySchedulePage() {
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
        // 6월 일정만 추출
        const juneEvents = getMonthlyEvents(data, 6);
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
  events.forEach(ev => {
    let d = new Date(ev.start);
    while (d <= ev.end) {
      const key = format(d, "yyyy-MM-dd");
      if (!eventsByDate[key]) eventsByDate[key] = [];
      eventsByDate[key].push(ev.title);
      d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
    }
  });

  return (
    <>
      <div className="max-w-lg mx-auto p-4">
        <h2 className="text-xl font-bold mb-4">2025년 6월 학사일정</h2>
        {loading && <div>불러오는 중...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && !error && (
          <>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={new Date(2025, 5, 1)} // 6월
              onMonthChange={() => { }} // 월 변경 비활성화
              className="rounded-md border mb-6"
              renderDay={date => {
                const key = format(date, "yyyy-MM-dd");
                const hasEvent = !!eventsByDate[key];
                return (
                  <div className="relative">
                    <span>{date.getDate()}</span>
                    {hasEvent && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    )}
                  </div>
                );
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
                      : `${format(ev.start, "M월 d일")} ~ ${format(ev.end, "M월 d일")}`}
                  </span>
                  <span>{ev.title}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}

export default monthlySchedulePage;