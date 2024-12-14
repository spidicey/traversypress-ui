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
    idNhanVien: number;
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
  nhanVien: string;
  soLuongPhieu: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const PhieuSuaNhanVienChart = ({
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
    const nhanVienMap = new Map<
      number,
      { hoTen: string; soLuongPhieu: number }
    >();

    filteredData.forEach((phieuSua) => {
      const { idNhanVien, hoTen } = phieuSua.nhanVien;
      if (!nhanVienMap.has(idNhanVien)) {
        nhanVienMap.set(idNhanVien, { hoTen, soLuongPhieu: 0 });
      }
      nhanVienMap.get(idNhanVien)!.soLuongPhieu++;
    });

    return Array.from(nhanVienMap.values()).map(({ hoTen, soLuongPhieu }) => ({
      nhanVien: hoTen,
      soLuongPhieu,
    }));
  }, [filteredData]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Phân Bố Phiếu Sửa Chữa Theo Nhân Viên</CardTitle>
        <CardDescription>
          Số lượng phiếu sửa chữa được xử lý bởi mỗi nhân viên
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            soLuongPhieu: {
              label: "Số Lượng Phiếu",
              color: "hsl(217, 91%, 60%)",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "bar" ? (
              <BarChart data={chartData}>
                <XAxis dataKey="nhanVien" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar
                  dataKey="soLuongPhieu"
                  fill="hsl(217, 91%, 60%)"
                  name="Số Lượng Phiếu"
                />
              </BarChart>
            ) : (
              <LineChart data={chartData}>
                <XAxis dataKey="nhanVien" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="soLuongPhieu"
                  stroke="hsl(217, 91%, 60%)"
                  name="Số Lượng Phiếu"
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default function BieuDoPhieuSua() {
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
        Không thể tải dữ liệu
      </div>
    );
  if (isLoading)
    return <div className="text-center text-xl mt-8">Đang tải...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Bảng Điều Khiển Phiếu Sửa Chữa Theo Nhân Viên
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
            <span>{chartType === "bar" ? "Biểu Đồ Cột" : "Biểu Đồ Đường"}</span>
          </Label>
        </div>
      </div>
      {data && (
        <PhieuSuaNhanVienChart
          data={data}
          dateRange={dateRange}
          chartType={chartType}
        />
      )}
    </div>
  );
}
