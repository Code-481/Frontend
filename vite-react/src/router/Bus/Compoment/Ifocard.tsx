import { Card } from "@/components/ui/card";
import data from "./businfo.json";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

interface BusRouteData {
  start_point: string;
  end_point: string;
  first_bus: string;
  last_bus: string;
  weekday_interval: string;
  weekend_interval: string;
  operator: string;
  authorized_vehicles: string;
  route: string[];
}

function Infocard(id: any) {
  const idMapping: Record<string, string> = {
    b64c6as: "6번",
    "12c69as": "6-1번",
    as5c67as: "9번",
  };

  const getSelectedData = (
    idValue: string | number | undefined
  ): BusRouteData[] => {
    if (typeof idValue !== "string") return [];

    const dataKey = idMapping[idValue];
    //@ts-ignore
    if (!dataKey || !data[dataKey]) return [];

    //@ts-ignore
    return data[dataKey];
  };

  //@ts-ignore
  const jsondata: BusRouteData = getSelectedData(id?.id);
 

  return (
    <>
      <div className="w-7/10 2xl:w-6/10">
        <Card>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">기점</TableCell>
                <TableCell>{jsondata.start_point}</TableCell>
                <TableCell className="font-medium">종점</TableCell>
                <TableCell>{jsondata.end_point}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">첫차</TableCell>
                <TableCell>{jsondata.first_bus}</TableCell>
                <TableCell className="font-medium">막차</TableCell>
                <TableCell >{jsondata.last_bus}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">평일 배차</TableCell>
                <TableCell>{jsondata.weekday_interval}</TableCell>
                <TableCell className="font-medium">주말 배차</TableCell>
                <TableCell>{jsondata.weekend_interval}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">운수사명</TableCell>
                <TableCell>{jsondata.operator}</TableCell>
                <TableCell className="font-medium">인가대수</TableCell>
                <TableCell>{jsondata.authorized_vehicles}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">노선</TableCell>
                <TableCell colSpan={3} className="p-4">
                  <div className="flex flex-wrap gap-1 leading-relaxed">
                    {jsondata.route.map((name, index) => (
                      <span key={index} className="inline-flex items-center">
                        <span className="text-sm">{name}</span>
                        {index < jsondata.route.length - 1 && (
                          <span className="mx-1 text-gray-400">→</span>
                        )}
                      </span>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </div>
    </>
  );
}
export default Infocard;
