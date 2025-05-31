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
                        src={festival.imageUrl ?? "https://images.unsplash.com/photo-1744968776876-283d9ae15eb0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        alt={festival.name ?? "축제 이미지"}
                        className="w-full h-32 object-cover rounded-t-md"
                    />
                    <CardHeader>
                        <CardTitle className="truncate">{festival.name ?? "이름 없음"}</CardTitle>
                        <CardDescription>
                            {festival.startDate ?? "일정 미정"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <p className="text-sm text-gray-700">{festival.address ?? "장소 미정"}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}