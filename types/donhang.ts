type DonHang = {
  idDonHang: number; // Primary key, auto-increment
  idKhachHang: number; // Foreign key to the `khach_hang` table
  tongTien: number ; // Decimal(15, 2) for total price
  ngayDat: Date ; // Timestamp for order date
  diaChi: string ; // Text for address
  trangThai: string ; // Varchar(50) for order status
  sdt: string; // Varchar(10) for phone number
  thanhToan: boolean ; // Tinyint representing payment status (0 or 1)
};
