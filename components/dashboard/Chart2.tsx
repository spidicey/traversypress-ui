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
import { BarChartIcon, LineChartIcon } from "lucide-react";
import { DateRangePicker } from "../ui/date-range-picker";
import { Toggle } from "../ui/toggle";

interface PhieuSua {
  idPhieuSua: number;
  khachHang: {
    tenKhachHang: string;
  };
  tenSanPham: string;
  moTa: string;
  loaiSuaChua: string;
  baoGia: number;
  ngayTao: string;
  nhanVien: {
    hoTen: string;
  };
  giaLinhKien: number;
}

interface ResponseData {
  status: number;
  message: string;
  data: PhieuSua[];
}

interface ChartData {
  loaiSuaChua: string;
  averageCost: number;
  count: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const PhieuSuaChart = ({
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

    return data.data.filter((phieuSua) => {
      const date = new Date(phieuSua.ngayTao);
      // @ts-ignore
      return date >= dateRange.from && date <= dateRange.to;
    });
  }, [data, dateRange]);

  const chartData = useMemo(() => {
    const repairTypeMap = new Map<
      string,
      { totalCost: number; count: number }
    >();

    filteredData.forEach((phieuSua) => {
      const { loaiSuaChua, baoGia, giaLinhKien } = phieuSua;
      if (!repairTypeMap.has(loaiSuaChua)) {
        repairTypeMap.set(loaiSuaChua, { totalCost: 0, count: 0 });
      }
      const data = repairTypeMap.get(loaiSuaChua)!;
      data.totalCost += baoGia + giaLinhKien;
      data.count++;
    });

    return Array.from(repairTypeMap).map(
      ([loaiSuaChua, { totalCost, count }]) => ({
        loaiSuaChua,
        averageCost: totalCost / count,
        count,
      })
    );
  }, [filteredData]);

  const ChartComponent = chartType === "bar" ? BarChart : LineChart;
  const DataComponent = chartType === "bar" ? Bar : Line;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Tổng số doanh thu theo loại </CardTitle>
        <CardDescription>Tổng số doanh thu theo loại</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            averageCost: {
              label: "Average Cost",
              color: "hsl(var(--primary))",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "bar" ? (
              <BarChart data={chartData}>
                <XAxis dataKey="loaiSuaChua" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar
                  dataKey="averageCost"
                  fill="hsl(var(--primary))"
                  name="Average Cost"
                />
              </BarChart>
            ) : (
              <LineChart data={chartData}>
                <XAxis dataKey="loaiSuaChua" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="averageCost"
                  stroke="hsl(var(--primary))"
                  name="Average Cost"
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default function PhieuSuaPage() {
  const { data, error, isLoading } = useSWR<ResponseData>(
    "http://localhost:8080/api/phieusua",
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
        Phieu Sua Dashboard
      </h1>
      <div className="mb-6 flex justify-center items-center space-x-4">
        <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
        <div className="flex items-center space-x-2">
          <Toggle
            pressed={chartType === "bar"}
            onPressedChange={() => setChartType("bar")}
            aria-label="Toggle Bar Chart"
          >
            <BarChartIcon className="h-4 w-4" />
          </Toggle>
          <Toggle
            pressed={chartType === "line"}
            onPressedChange={() => setChartType("line")}
            aria-label="Toggle Line Chart"
          >
            <LineChartIcon className="h-4 w-4" />
          </Toggle>
        </div>
      </div>
      {data && (
        <PhieuSuaChart
          data={data}
          dateRange={dateRange}
          chartType={chartType}
        />
      )}
      <h2 className="text-2xl font-semibold mt-12 mb-6">Danh sách phiếu sửa</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data
          .filter((phieuSua) => {
            if (!dateRange?.from || !dateRange?.to) return true;
            const date = new Date(phieuSua.ngayTao);
            return date >= dateRange.from && date <= dateRange.to;
          })
          .map((phieuSua) => (
            <Card key={phieuSua.idPhieuSua}>
              <CardHeader>
                <CardTitle>Phiếu sửa #{phieuSua.idPhieuSua}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Ngày sửa:</strong>{" "}
                  {new Date(phieuSua.ngayTao).toLocaleDateString()}
                </p>
                <p>
                  <strong>Sản phẩm:</strong> {phieuSua.tenSanPham}
                </p>
                <p>
                  <strong>Loại sửa chữa:</strong> {phieuSua.loaiSuaChua}
                </p>
                <p>
                  <strong>Báo giá:</strong>{" "}
                  {(phieuSua.baoGia + phieuSua.giaLinhKien).toLocaleString()}{" "}
                  VND
                </p>
                <p>
                  <strong>Tổng giá:</strong>{" "}
                  {phieuSua.loaiSuaChua === "Bảo hành"
                    ? 0
                    : (
                        phieuSua.baoGia + phieuSua.giaLinhKien
                      ).toLocaleString()}{" "}
                  VND
                </p>
                <p>
                  <strong>Khách hàng:</strong> {phieuSua.khachHang.tenKhachHang}
                </p>
                <p>
                  <strong>Kỹ thuật viên:</strong> {phieuSua.nhanVien.hoTen}
                </p>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
