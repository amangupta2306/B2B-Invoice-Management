import { IndianRupee, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PieChartGraph } from "./pie-chart";
import { auth } from "@/auth";
import prisma from "@/lib/db";

export async function SectionCards() {
  const session = await auth();
  const invoices = await prisma.invoice.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  const customers = await prisma.customer.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  const invoicesGroupBy = await prisma.invoice.groupBy({
    where: {
      invoiceDate: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
      },
      userId: session?.user?.id,
    },
    by: ["customerId"],
    _count: {
      id: true,
    },
  });

  const getRandomRGB = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const pieChartData = invoicesGroupBy.map((invoice) => {
    const customer = customers.find(
      (customer) => customer.id === invoice.customerId
    );
    return {
      customerName: customer?.customerName,
      invoiceCount: invoice._count.id,
      fill: getRandomRGB(),
    };
  });

  const grossRevenue = invoices
    .reduce((acc, invoice) => {
      return acc + Number(invoice.totalInvoiceValue);
    }, 0)
    .toFixed(2);

  return (
    <div className="flex items-center justify-center w-full gap-4">
      <div className="flex flex-col items-center justify-center gap-4 flex-1">
        <div className="flex w-full items-center gap-4">
          <Card className="w-full">
            <CardHeader className="relative">
              <CardDescription>Gross Revenue</CardDescription>
              <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums flex items-center">
                <IndianRupee size={20} />
                {grossRevenue}
              </CardTitle>
              <div className="absolute right-4 top-4">
                <Badge
                  variant="outline"
                  className="flex gap-1 rounded-lg text-xs"
                >
                  <TrendingUpIcon className="size-3" />
                  +12.5%
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Trending up this month <TrendingUpIcon className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Showing total gross sales
              </div>
            </CardFooter>
          </Card>
          <Card className="w-full">
            <CardHeader className="relative">
              <CardDescription>New Customers</CardDescription>
              <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                1,234
              </CardTitle>
              <div className="absolute right-4 top-4">
                <Badge
                  variant="outline"
                  className="flex gap-1 rounded-lg text-xs"
                >
                  <TrendingDownIcon className="size-3" />
                  -20%
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Down 20% this period <TrendingDownIcon className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Acquisition needs attention
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className="flex w-full items-center gap-4">
          <Card className="w-full">
            <CardHeader className="relative">
              <CardDescription>Active Accounts</CardDescription>
              <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                45,678
              </CardTitle>
              <div className="absolute right-4 top-4">
                <Badge
                  variant="outline"
                  className="flex gap-1 rounded-lg text-xs"
                >
                  <TrendingUpIcon className="size-3" />
                  +12.5%
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Strong user retention <TrendingUpIcon className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Engagement exceed targets
              </div>
            </CardFooter>
          </Card>
          <Card className="w-full">
            <CardHeader className="relative">
              <CardDescription>Growth Rate</CardDescription>
              <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                4.5%
              </CardTitle>
              <div className="absolute right-4 top-4">
                <Badge
                  variant="outline"
                  className="flex gap-1 rounded-lg text-xs"
                >
                  <TrendingUpIcon className="size-3" />
                  +4.5%
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Steady performance <TrendingUpIcon className="size-4" />
              </div>
              <div className="text-muted-foreground">
                Meets growth projections
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div>
        <PieChartGraph chartData={pieChartData} />
      </div>
    </div>
  );
}
