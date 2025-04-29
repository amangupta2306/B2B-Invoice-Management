import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartAreaInteractive } from "../chart-area-interactive";
import { SectionCards } from "../section-cards";

export const Dashboard = async () => {
  return (
    <>
      <Card className="m-5">
        <CardHeader>
          <CardTitle className="font-semibold">Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <div className="flex flex-col gap-4 items-center">
            <SectionCards />
            <ChartAreaInteractive />
          </div>
        </CardContent>
      </Card>
    </>
  );
};
