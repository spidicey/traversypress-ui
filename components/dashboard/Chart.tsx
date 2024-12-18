"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { BarChartIcon, LineChartIcon } from "lucide-react";
import { DateRangePicker } from "../ui/date-range-picker";

interface PhieuHen {
  idPhieuHen: number;
  ngayHen: string;
  khachHang: {
    tenKhachHang: string;
  };
  trangThai: string;
  category: {
    idLoai: number;
    loai: string;
  };
}

interface ResponseData {
  status: number;
  message: string;
  data: PhieuHen[];
}

interface ChartData {
  category: string;
  "Hoàn thành": number;
  "Đang chờ": number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const PhieuHenChart = ({
  data,
  dateRange,
  chartType,
}: {
  data: ResponseData;
  dateRange: DateRange | undefined;
  chartType: "bar" | "line";
}) => {
  const filteredData = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) return data.data;

    return data.data.filter((phieuHen) => {
      const date = new Date(phieuHen.ngayHen);
      // @ts-ignore
      return date >= dateRange.from && date <= dateRange.to;
    });
  }, [data, dateRange]);

  const chartData = useMemo(() => {
    const categoryMap = new Map<
      string,
      { "Hoàn thành": number; "Đang chờ": number }
    >();

    filteredData.forEach((phieuHen) => {
      const category = phieuHen.category.loai;
      const status = phieuHen.trangThai;

      if (!categoryMap.has(category)) {
        categoryMap.set(category, { "Hoàn thành": 0, "Đang chờ": 0 });
      }

      const categoryData = categoryMap.get(category)!;
      categoryData[status as keyof typeof categoryData]++;
    });

    return Array.from(categoryMap).map(([category, counts]) => ({
      category,
      "Hoàn thành": counts["Hoàn thành"],
      "Đang chờ": counts["Đang chờ"],
    }));
  }, [filteredData]);

  const ChartComponent = chartType === "bar" ? BarChart : LineChart;
  const DataComponent = chartType === "bar" ? Bar : Line;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Phân bố phiếu hẹn theo trạng thái</CardTitle>
        <CardDescription>
          Số phiếu hẹn theo trạng thái trong khoáng thời gian.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            "Hoàn thành": {
              label: "Completed",
              color: "hsl(217, 91%, 60%)", // Darker blue
            },
            "Đang chờ": {
              label: "Pending",
              color: "hsl(217, 91%, 80%)", // Lighter blue
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "bar" ? (
              <BarChart data={chartData}>
                <XAxis dataKey="category" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar
                  dataKey="Hoàn thành"
                  fill="hsl(217, 91%, 60%)"
                  name="Completed"
                />
                <Bar
                  dataKey="Đang chờ"
                  fill="hsl(217, 91%, 80%)"
                  name="Pending"
                />
              </BarChart>
            ) : (
              <LineChart data={chartData}>
                <XAxis dataKey="category" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Hoàn thành"
                  stroke="hsl(217, 91%, 60%)"
                  name="Completed"
                />
                <Line
                  type="monotone"
                  dataKey="Đang chờ"
                  stroke="hsl(217, 91%, 80%)"
                  name="Pending"
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default function CustomChart() {
  const { data, error, isLoading } = useSWR<ResponseData>(
    "http://localhost:8080/api/phieuhen",
    fetcher
  );
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  const [chartType, setChartType] = useState<"bar" | "line">("bar");

  if (error)
    return (
      <div className="text-center text-red-500 text-xl mt-8">
        Failed to load data
      </div>
    );
  if (isLoading)
    return <div className="text-center text-xl mt-8">Đang tải...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Phieu Hen Dashboard
      </h1>
      <div className="mb-6 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
        <div className="flex items-center space-x-2">
          <Switch
            id="chart-type"
            checked={chartType === "line"}
            onCheckedChange={(checked) =>
              setChartType(checked ? "line" : "bar")
            }
          />
          <Label htmlFor="chart-type" className="flex items-center space-x-2">
            {chartType === "bar" ? (
              <BarChartIcon className="h-4 w-4" />
            ) : (
              <LineChartIcon className="h-4 w-4" />
            )}
            <span>{chartType === "bar" ? "Bar Chart" : "Line Chart"}</span>
          </Label>
        </div>
      </div>
      {data && (
        <PhieuHenChart
          data={data}
          dateRange={dateRange}
          chartType={chartType}
        />
      )}
      <h2 className="text-2xl font-semibold mt-12 mb-6">Danh sách phiếu hẹn</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data
          .filter((phieuHen) => {
            if (!dateRange?.from || !dateRange?.to) return true;
            const date = new Date(phieuHen.ngayHen);
            return date >= dateRange.from && date <= dateRange.to;
          })
          .map((phieuHen) => (
            <Card key={phieuHen.idPhieuHen}>
              <CardHeader>
                <CardTitle>Phiếu hẹn #{phieuHen.idPhieuHen}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Ngày:</strong>{" "}
                  {new Date(phieuHen.ngayHen).toLocaleDateString()}
                </p>
                <p>
                  <strong>Trạng thái:</strong> {phieuHen.trangThai}
                </p>
                <p>
                  <strong>Loại:</strong> {phieuHen.category.loai}
                </p>
                <p>
                  <strong>Khách hàng:</strong> {phieuHen.khachHang.tenKhachHang}
                </p>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
