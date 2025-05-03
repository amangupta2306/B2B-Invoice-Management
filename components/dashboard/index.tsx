import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartAreaInteractive } from "../chart-area-interactive";
import { SectionCards } from "../section-cards";

export const Dashboard = async () => {
  return (
    <>
      <Card className="lg:m-5 pt-5 lg:pt-0">
        <div className="hidden lg:block">
          <CardHeader>
            <CardTitle className="font-semibold">
              Dashboard
            </CardTitle>
          </CardHeader>
        </div>
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
