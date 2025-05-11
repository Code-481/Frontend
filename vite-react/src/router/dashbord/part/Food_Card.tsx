import {
    Card,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"

function Food_Card() {
    return (
        <div className="min-w-[25vw]">
            <Card>
                <div className="pr-3 pl-3 p-6">
                    <p className="text-2xl font-bold pb-4">오늘 대학 식단</p>

                    <Card className="p-4">
                        <div className="pb-3">
                            <CardTitle className="text-lg">Card Title</CardTitle>
                            <CardDescription className="text-md">Card Description</CardDescription>
                        </div>
                        <div className="pb-3">
                            <CardTitle className="text-lg">Card Title</CardTitle>
                            <CardDescription className="text-md">Card Description</CardDescription>
                        </div>
                        <div >
                            <CardTitle className="text-lg">Card Title</CardTitle>
                            <CardDescription className="text-md">Card Description</CardDescription>
                        </div>
                    </Card>
                    <div className="h-3"></div>
                    <Card className="p-4">
                        <div className="pb-2">
                            <CardTitle className="text-lg">Card Title</CardTitle>
                            <CardDescription className="text-md">Card Description</CardDescription>
                        </div>
                        <div className="pb-2">
                            <CardTitle className="text-lg">Card Title</CardTitle>
                            <CardDescription className="text-md">Card Description</CardDescription>
                        </div>
                        <div >
                            <CardTitle className="text-lg">Card Title</CardTitle>
                            <CardDescription className="text-md">Card Description</CardDescription>
                        </div>
                    </Card>

                </div>
            </Card>
        </div>
    )
}

export default Food_Card;