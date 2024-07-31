type PhieuHen = {
  idPhieuHen: number;
  ngayHen: Date;
  khachHang: KhachHang;
  nhanVien: NhanVien;
  trangThai: "Đang chờ" | "Hoàn thành" | "Đã hủy";
  category: Category;
};
