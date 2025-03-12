import { LineChartGraph } from "@/components/line-chart";
import { PieChartGraph } from "@/components/pie-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Dashboard() {
  return (
    <Card className="m-5">
      <CardHeader>
        <CardTitle className="font-semibold">Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Card>
          <CardContent>
            <PieChartGraph />
          </CardContent>
          <CardContent>
            <LineChartGraph />
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
