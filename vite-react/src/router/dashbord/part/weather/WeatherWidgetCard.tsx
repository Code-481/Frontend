import { Card } from "@/components/ui/card";
import { getWeatherIcon, getDayKor } from "../utils/weatherCodes";
import { getWeatherBgGradient } from "../utils/weatherBg";

interface WeeklyDay {
  date: string;
  minTemperature: number;
  maxTemperature: number;
  sky: number;
  cloud: number;
}

interface WeatherWidgetCardProps {
  temperature: number;
  sunsetTime: string;
  location: string;
  cloud: number;
  sky: number;
  weekly: WeeklyDay[];
}

export default function ResponsiveWeatherCard({
  temperature,
  sunsetTime,
  location,
  cloud,
  sky,
  weekly,
}: WeatherWidgetCardProps) {
  const bg = getWeatherBgGradient(cloud, sky);

  return (
    <Card
      className={`
        w-[39vw] 
        h-[30vh] 
        md:h-[28vh] 
        lg:h-[26vh] 
        lg:w-[60vw] 
        xl:h-[24vh] 
        xl:w-[39vw] 
        2xl:h-[30vh]
        min-h-[300px] 
        max-h-[400px]
        rounded-3xl 
        p-10
        shadow-md 
        flex flex-col justify-between
      `}
      style={{
        background: bg,
        color: "#fff",
        transition: "background 0.5s",
      }}
    >
      <div className="flex flex-row items-center gap-4">
        <span className="text-5xl md:text-6xl drop-shadow">{getWeatherIcon(cloud, sky)}</span>
        <div>
          <div className="text-3xl md:text-6xl font-bold">{temperature}°</div>
          <div className="text-xl text-white/80 mt-1">Sunset at {sunsetTime}</div>
          <div className="flex items-center gap-1 text-md text-white/80 mt-1">
            <svg width="25" height="25" fill="none" className="inline-block">
              <circle cx="7" cy="7" r="6" stroke="#fff" strokeWidth="2" />
              <circle cx="7" cy="7" r="2" fill="#fff" />
            </svg>
            {location}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-2 mt-3">
        {weekly.slice(0, 5).map((day) => (
          <div key={day.date} className="flex flex-col items-center text-white/90 text-xs">
            <span className="mb-1 text-xl font-bold">{getDayKor(day.date)}</span>
            <span className="text-base md:text-xl">{getWeatherIcon(day.cloud, day.sky)}</span>
            <span className="text-2xl font-bold">
              <span>{day.maxTemperature}°</span>
              <span className="text-white/60"> {day.minTemperature}°</span>
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
