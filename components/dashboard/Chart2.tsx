"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

const data = [
  {
    idPhieuHen: 1,
    ngayHen: "2024-07-15",
    trangThai: "Đã huỷ",
  },
  {
    idPhieuHen: 2,
    ngayHen: "2024-07-16",
    trangThai: "Đang xử lý",
  },
  {
    idPhieuHen: 3,
    ngayHen: "2024-07-17",
    trangThai: "Đã huỷ",
  },
];

export default function AppointmentChart() {
    const { data, isLoading, error } = useSWR<ResponseData<PhieuHen[]>>(
        `http://localhost:8080/api/phieuhen`,
        fetcher
      );
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 6, 15),
    to: new Date(2024, 6, 17),
  });
if (isLoading) return <div>Loading...</div>;
  if (error || !data || data.status !== 200)
    return <div>Error loading data</div>;
  const processData = (data: PhieuHen[], range: DateRange | undefined) => {
    // Filter data based on the selected date range
    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.ngayHen);
      if (range?.from && range?.to) {
        return itemDate >= range.from && itemDate <= range.to;
      }
      return true;
    });

    // Count occurrences of each status
    const statusCount = filteredData.reduce((acc: any, curr: any) => {
      acc[curr.trangThai] = (acc[curr.trangThai] || 0) + 1;
      return acc;
    }, {});

    // Format data for the chart
    return Object.entries(statusCount).map(([status, count]) => ({
      status,
      count,
    }));
  };

  const chartData = processData(data?.data, date);

  return (
    <div className="space-y-6">
      <Card>
      <CardHeader>
          <CardTitle>Biểu đồ lịch hẹn</CardTitle>
          <CardDescription>Xem lịch hẹn qua dòng thời gian</CardDescription>
        </CardHeader>
        <div className="flex items-center gap-4 p-4">
          {/* Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
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
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Bar Chart */}
        <div className="w-full h-64">
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <Bar dataKey="count" fill="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
