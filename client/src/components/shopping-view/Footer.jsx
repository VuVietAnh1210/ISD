import { Facebook, Mail } from 'lucide-react';

function Footer() {
    return (
        <footer className="bg-black text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Cột 1: Thông tin công ty */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">THỜI TRANG THIẾT KẾ THU HÂN</h3>
                        <p className="text-sm">
                            Công ty TNHH Thu Hân<br />
                            Mã số thuế: 0102041710 - Quần lý bởi Chi cục Thuế Quận Đống Đa<br />
                            Địa chỉ: Cở sở 1: Số 5 Nguyễn Hồng, C2, Khu Tâp Thể Vĩnh Hồ, Phường Thịnh Quang, Quận Đống Đa, Hà Nội<br />
                            Ngay bắt đầu hoạt động: 04-10-2006<br />
                            Số điện thoại: 02437763080 & 098 559 9687
                        </p>
                    </div>

                    {/* Cột 2: Chính sách */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Chính sách Vận chuyển & Giao hàng</h3>
                        <ul className="text-sm space-y-2">
                            <li>Hướng dẫn Thanh toán</li>
                            <li>Theo dõi Đơn hàng</li>
                            <li>Hướng dẫn Chọn size</li>
                            <li>Chính sách Đổi trả</li>
                            <li>Chính sách Bảo hành & Sửa chữa</li>
                            <li>Khách hàng thân thiết</li>
                            <li>Hướng dẫn Bảo quản sản phẩm</li>
                        </ul>
                    </div>

                    {/* Cột 3: Liên hệ */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Liên hệ:</h3>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com"
                               target="_blank"
                               rel="noopener noreferrer"
                               className="bg-[#1877F2] rounded-full">
                                <Facebook className="w-6 h-6 text-white " />
                            </a>
                            <a href="mailto:example@gmail.com">
                                <Mail className="w-6 h-6 " />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;