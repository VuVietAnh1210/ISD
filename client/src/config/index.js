
export const registerFormControls = [
  {
    name: "userName",
    label: "Tên người dùng",
    placeholder: "Nhập tên người dùng của bạn",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Nhập email của bạn",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Mật khẩu",
    placeholder: "Nhập mật khẩu của bạn",
    componentType: "input",
    type: "password",
    showPasswordToggle: true,
  },
  {
    name: "confirmPassword",
    label: "Xác nhận lại mật khẩu",
    placeholder: "Xác nhận lại mật khẩu của bạn",
    componentType: "input",
    type: "password",
    showPasswordToggle: true, // Bật tính năng hiện/ẩn mật khẩu
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Nhập email của bạn",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Mật khẩu",
    placeholder: "Nhập mật khẩu của bạn ",
    componentType: "input",
    type: "password",
    showPasswordToggle: true,
  },
];

export const addProductFormElements = [
  {
    label: "Tiêu đề",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Nhập tiêu đề sản phẩm",
  },
  {
    label: "Mô tả",
    name: "description",
    componentType: "textarea",
    placeholder: "Nhập mô tả sản phầm",
  },
  // {
  //   label: "Loại",
  //   name: "category",
  //   componentType: "select",
  //   options: [
  //     { id: "men", label: "Nam" },
  //     { id: "women", label: "Nữ" },
  //     { id: "kids", label: "Trẻ em" },
  //     // { id: "accessories", label: "Accessories" },
  //     // { id: "footwear", label: "Footwear" },
  //   ],
  // },
  // {
  //   label: "Thương hiệu",
  //   name: "brand",
  //   componentType: "select",
  //   options: [
  //     { id: "nike", label: "Nike" },
  //     { id: "adidas", label: "Adidas" },
  //     { id: "puma", label: "Puma" },
  //     { id: "levi", label: "Levi's" },
  //     { id: "zara", label: "Zara" },
  //     { id: "h&m", label: "H&M" },
  //   ],
  // },
  {
    label: "Giá",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Nhập giá sản phẩm",
  },
  {
    label: "Giá ưu đãi",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Nhập giá ưu đãi ( nếu có)",
  },
  {
    label: "Tổng số sản phẩm",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Nhập tổng số sản phẩm",
  },
]

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "TRANG CHỦ",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "SẢN PHẨM",
    path: "/shop/listing",
  },
  // {
  //   id: "men",
  //   label: "Men",
  //   path: "/shop/listing",
  // },
  // {
  //   id: "women",
  //   label: "Women",
  //   path: "/shop/listing",
  // },
  // {
  //   id: "kids",
  //   label: "Kids",
  //   path: "/shop/listing",
  // },
  // {
  //   id: "footwear",
  //   label: "Footwear",
  //   path: "/shop/listing",
  // },
  {
    id: "accessories",
    label: "BỘ SƯU TẬP",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "ĐƠN HÀNG",
    path: "/shop/search",
  },
]

export const categoryOptionsMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
  footwear: "Footwear",
}

export const brandOptionsMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  levi: "Levi",
  zara: "Zara",
  "h&m": "H&M",
}

export const filterOptions = {
  category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
  ],
}

export const sortOptions = [
  { id: "price-lowtohigh", label: "Giá: Thấp đến cao" },
  { id: "price-hightolow", label: "Giá: Cao đến thấp" },
  { id: "title-atoz", label: "Tiêu đề: A đến Z" },
  { id: "title-ztoa", label: "Tiêu đề: Z đến A" },
]

export const addressFormControls = [
  {
    label: "Địa chỉ",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Nhập địa chỉ của bạn",
  },
  {
    label: "Thành phố",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Nhập thành phố của bạn",
  },
  // {
  //   label: "Mã bưu chính",
  //   name: "pincode",
  //   componentType: "input",
  //   type: "text",
  //   placeholder: "Nhập mã bưu chính",
  // },
  {
    label: "Số điện thoại",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Nhập số điện thoại của bạn",
  },
  {
    label: "Ghi chú",
    name: "notes",
    componentType: "textarea",
    placeholder: "Nhập ghi chú bổ sung ",
  },
];

