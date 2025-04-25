import { Outlet } from "react-router-dom";
import signInImage from "../../assets/signin1.JPG"; // Giả sử bạn đã chuyển ảnh vào thư mục assets

function AuthLayout() {
    // Inline styles
    const containerStyle = {
        display: "flex",
        minHeight: "100vh",
        width: "100%",
    };

    // const leftSideStyle = {
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     width: "50%",
    //     background: "linear-gradient(to right, #4f46e5, #9333ea)",
    //     color: "white",
    //     textAlign: "center",
    //     padding: "20px",
    // };

    // const contentStyle = {
    //     maxWidth: "400px",
    // };

    // const imageStyle = {
    //     width: "100%",
    //     height: "auto",
    //     borderRadius: "10px",
    //     boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
    //     marginTop: "15px",
    // };

    const leftSideStyle = {
        width: "50%",
        position: "relative", // Thêm position relative
        overflow: "hidden",
        background: "#000",
    };

    const imageStyle = {
        width: "100%",
        height: "100%",
        objectFit: "cover", 
        position: "absolute",
        top: "50%",
        left: "50%", 
        transform: "translate(-50%, -50%)", 
    };

    // const buttonStyle = {
    //     marginTop: "15px",
    //     padding: "10px 20px",
    //     backgroundColor: "white",
    //     color: "#4f46e5",
    //     border: "none",
    //     borderRadius: "25px",
    //     fontWeight: "bold",
    //     cursor: "pointer",
    //     transition: "0.3s",
    // };

    // const buttonHoverStyle = {
    //     backgroundColor: "#e0e0e0",
    // };

    const rightSideStyle = {
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f3f4f6",
        padding: "20px",
    };

    const formContainerStyle = {
        maxWidth: "400px",
        width: "100%",
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        textAlign: "center",
    };

    return (
        <div style={containerStyle}>
            {/* Left Side - Only Image */}
            <div style={leftSideStyle}>
                <img
                    src={signInImage}
                    alt="Authentication"
                    style={imageStyle}
                />
            </div>

            {/* Right Side - Sign In Form */}
            <div style={rightSideStyle}>
                <div style={formContainerStyle}>
                    {/*<h2>Đăng nhập</h2>*/}
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;
