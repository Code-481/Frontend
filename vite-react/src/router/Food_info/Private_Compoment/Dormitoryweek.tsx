import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Dormitoryweek() {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <>
      <div className="grid pt-5">
        {/* 커스텀 탭 버튼들 */}
        <div className="flex w-10  gap-x-4 mb-4">
          <Button
            variant={activeTab === "account" ? "default" : "outline"}
            onClick={() => setActiveTab("account")}
            className="flex-1"
          >
            효민기숙사
          </Button>
          <Button
            variant={activeTab === "password" ? "default" : "outline"}
            onClick={() => setActiveTab("password")}
            className="flex-1"
          >
            행복기숙사
          </Button>
        </div>

        {/* 탭 콘텐츠만 포함 */}
        <div className="w-full">
          {activeTab === "account" && (
            //아마 각각 카드로 표시
            <Card className="p-5">
              <CardHeader>
                <CardTitle>효민기숙사</CardTitle>
                <CardDescription>
                  효민기숙사 식단표를 확인하세요.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Pedro Duarte" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="@peduarte" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "password" && (
            //아마 각각 카드로 표시
            <Card className="p-5">
              <CardHeader>
                <CardTitle>행복기숙사</CardTitle>
                <CardDescription>
                  행복기숙사 식단표를 확인하세요.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}

export default Dormitoryweek;
