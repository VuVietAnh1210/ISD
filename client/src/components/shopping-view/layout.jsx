import { Outlet } from 'react-router-dom';
import { MessageCircle } from "lucide-react";
import ShoppingHeader from './header'; // Đường dẫn đến ShoppingHeader.jsx
import Footer from './Footer'; // Import Footer

function ShoppingLayout() {
    return (
        <div className="flex flex-col min-h-screen">
            <ShoppingHeader />
            <main className="flex-grow">
                <Outlet /> {/* Đây là nơi các trang con như ShoppingHome, ShoppingListing, v.v. được render */}
            </main>
            <Footer />
            <button
                className="fixed bottom-6 right-6 bg-gray-800 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 transition-colors z-50"
                onClick={() => {
                    window.open("https://m.me/your-page-id", "_blank"); // Thay bằng link chat của bạn
                }}
            >
                <MessageCircle className="w-6 h-6" />
            </button>
        </div>
    );
}

export default ShoppingLayout;