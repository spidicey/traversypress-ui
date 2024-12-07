"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
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
import { format, parseISO, isWithinInterval } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

// Define types for the API response
interface KhachHang {
  idKhachHang: number;
  tenKhachHang: string;
  diaChi: string;
  dienThoai: string;
  maSoThue: string;
}

interface PhieuHen {
  idPhieuHen: number;
  ngayHen: string;
  trangThai: string;
  khachHang: KhachHang;
}

export default function AppointmentChart() {
  const { data, isLoading, error } = useSWR<ResponseData<PhieuHen[]>>(
    `http://localhost:8080/api/phieuhen`,
    fetcher
  );

  const [chartType, setChartType] = useState<"line" | "bar">("bar");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  if (isLoading) return <div>Loading...</div>;
  if (error || !data || data.status !== 200)
    return <div>Error loading data</div>;

  const processDataForChart = (appointments: PhieuHen[], range: DateRange | undefined) => {
    const groupedData = appointments.reduce((acc: Record<string, number>, appointment: PhieuHen) => {
      const appointmentDate = parseISO(appointment.ngayHen);
      const formattedDate = format(appointmentDate, "yyyy-MM-dd");
      console.log(formattedDate)
      if (
        range?.from &&
        range?.to &&
        isWithinInterval(appointmentDate, { start: range.from, end: range.to })
      ) {
        acc[formattedDate] = (acc[formattedDate] || 0) + 1; // Counting occurrences by date
      }
      return acc;
    }, {});
  
    return Object.entries(groupedData).map(([date, count]) => ({
      date,
      count,
    }));
  };

  const chartData = processDataForChart(data.data, dateRange);
  console.log(chartData)
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Biểu đồ lịch hẹn</CardTitle>
          <CardDescription>Xem lịch hẹn theo thời gian</CardDescription>
        </CardHeader>

        <div className="flex items-center justify-between gap-4 p-4">
          {/* Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant="outline"
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !dateRange && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, yyyy")} -{" "}
                      {format(dateRange.to, "LLL dd, yyyy")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, yyyy")
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
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          {/* Chart Type Toggle */}
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

        {/* Chart */}
        <div className="w-full h-64">
          <ResponsiveContainer>
            {chartType === "line" ? (
              <LineChart data={chartData}>
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="status" />
                <YAxis allowDecimals={false} />
                <Tooltip />
              </LineChart>
            ) : (
              <BarChart data={chartData}>
                <Bar dataKey="count" fill="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="status" />
                <YAxis allowDecimals={false} />
                <Tooltip />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
