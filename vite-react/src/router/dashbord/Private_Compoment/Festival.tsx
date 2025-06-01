import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Festival({ festivalData }: { festivalData: any[] }) {
  return (
    <div
      className="flex gap-x-4 h-[24vh] overflow-x-auto "
      style={{ WebkitOverflowScrolling: "touch" }} // 모바일 부드러운 스크롤
    >
      {festivalData.slice(0, 4).map((festival, index) => (
        <Card key={index} className="w-[60%] min-w-[250px] max-w-[350px]">
          <img
            src={
              festival.fields["이미지URL"] ??
              "https://images.unsplash.com/photo-1744968776876-283d9ae15eb0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={festival.name ?? "축제 이미지"}
            className="w-full h-32 object-cover rounded-t-md"
          />
          <div className="p-3">
            <CardTitle className="truncate">
              {festival.fields["제목"] ?? "이름 없음"}
            </CardTitle>
            <CardDescription>
              {festival.fields["이용요일 및 시간"] ?? "일정 미정"}
            </CardDescription>

            <CardContent>
              <p className="text-sm text-gray-700">
                {festival.fields["주소"] ?? "장소 미정"}
              </p>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
}
