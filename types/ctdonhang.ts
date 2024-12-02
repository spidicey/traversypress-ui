interface CtDonHang {
    idDonHang: number;      // Foreign key to don_hang table
    idSanPham: number;      // Foreign key to linh_kien table
    soLuong?: number;       // Quantity, optional since it can be null
    gia?: number;           // Price with decimal, optional since it can be null
  }
  