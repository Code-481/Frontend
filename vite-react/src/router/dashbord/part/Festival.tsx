import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

function Festival() {
    return <>
        <div className="flex gap-x-4 h-[25vh] overflow-x-scroll ">
            <Card className="w-[60%] ">
                <img src="https://images.unsplash.com/photo-1744968776876-283d9ae15eb0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent className="pl-6">
                    <p>Card Content</p>
                </CardContent>

            </Card>
            <Card className="w-[60%]">
                <img src="https://images.unsplash.com/photo-1744968776876-283d9ae15eb0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />

                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent className="pl-6">
                    <p>Card Content</p>
                </CardContent>

            </Card>
            <Card className="w-[60%]">
                <img src="https://images.unsplash.com/photo-1741121893215-09ff0e3906fb?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent className="pl-6">
                    <p>Card Content</p>
                </CardContent>

            </Card>
            <Card className="w-[60%]">
                <img src="https://images.unsplash.com/photo-1741808045701-16fbab329169?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent className="pl-6">
                    <p>Card Content</p>
                </CardContent>

            </Card>

        </div>
    </>

}


export default Festival;