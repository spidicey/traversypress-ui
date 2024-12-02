"use client";

import { useState } from "react";
import useSWR from "swr";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { addDays, format, isWithinInterval } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { fetcher } from "../utils/fetcher";

// API fetcher function

export default function CustomChart() {
  const { data, isLoading, error } = useSWR<ResponseData<DonHang[]>>(
    `http://localhost:8080/api/thanh-toan/don-hang`,
    fetcher
  );

  const [chartType, setChartType] = useState<"line" | "bar">("line");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2024, 9, 20), // Example start date
    to: new Date(2024, 9, 30), // Example end date
  });

  if (isLoading) return <div>Loading...</div>;
  if (error || !data || data.status !== 200)
    return <div>Error loading data</div>;

  const processDataForChart = (
    orders: DonHang[],
    dateRange: DateRange | undefined
  ) => {
    const groupedData = orders.reduce((acc: any, curr: DonHang) => {
      //@ts-ignore
      const date = curr.ngayDat.split("T")[0];
      const parsedDate = new Date(date);
      if (
        !dateRange ||
        !dateRange.from ||
        !dateRange.to ||
        isWithinInterval(parsedDate, {
          start: dateRange.from,
          end: dateRange.to,
        })
      ) {
        acc[date] = (acc[date] || 0) + curr.tongTien;
      }
      return acc;
    }, {});

    return Object.entries(groupedData).map(([date, total]) => ({
      date,
      sales: total,
    }));
  };

  const filteredData = processDataForChart(data.data, dateRange);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Biểu đồ đơn hàng</CardTitle>
          <CardDescription>Xem đơn hàng qua dòng thời</CardDescription>
        </CardHeader>
        <div className="flex items-center justify-between gap-4 p-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !dateRange && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <div className="flex gap-2">
            <Button
              variant={chartType === "line" ? "default" : "outline"}
              onClick={() => setChartType("line")}
            >
              Line Chart
            </Button>
            <Button
              variant={chartType === "bar" ? "default" : "outline"}
              onClick={() => setChartType("bar")}
            >
              Bar Chart
            </Button>
          </div>
        </div>

        <div className="w-full h-64">
          <ResponsiveContainer>
            {chartType === "line" ? (
              <LineChart data={filteredData}>
                <Line type="monotone" dataKey="sales" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
              </LineChart>
            ) : (
              <BarChart data={filteredData}>
                <Bar dataKey="sales" fill="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
