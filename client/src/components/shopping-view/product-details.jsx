"use client";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";
import { formatPrice } from "@/lib/utils";
import cottonImg from "@/assets/cotton.jpg";
import polyesterImg from "@/assets/polyester.jpg";
import woolImg from "@/assets/wool.webp";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  // Thêm state để theo dõi chất liệu và màu sắc được chọn
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const { toast } = useToast();

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    const getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Chỉ có thể thêm ${getQuantity} sản phẩm này`,
            variant: "destructive",
          });
          return;
        }
      }
    }

    // Gửi thông tin chất liệu và màu sắc cùng với sản phẩm
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
        material: selectedMaterial, // Thêm chất liệu
        color: selectedColor, // Thêm màu sắc
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Đã thêm sản phẩm vào giỏ hàng",
        });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
    setSelectedMaterial(null); // Reset chất liệu
    setSelectedColor(null); // Reset màu sắc
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Đã thêm đánh giá thành công!",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image || "/placeholder.svg"}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="">
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              {formatPrice(productDetails?.price)}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                {formatPrice(productDetails?.salePrice)}
              </p>
            ) : null}
          </div>

          <div className="space-y-5 mt-6">
            <div>
              <h3 className="font-semibold mb-2">Số đo</h3>
              <div className="grid grid-cols-3 gap-2">
                <Input type="number" placeholder="Ngực (cm)" />
                <Input type="number" placeholder="Eo (cm)" />
                <Input type="number" placeholder="Hông (cm)" />
              </div>
            </div>

            {/* Chất liệu vải */}
            <div>
              <h3 className="font-semibold mb-2">Chất liệu vải</h3>
              <div className="flex gap-3">
                <label className="flex flex-col items-center cursor-pointer">
                  <input
                    type="radio"
                    name="fabric"
                    className="sr-only"
                    onChange={() => setSelectedMaterial("cotton")}
                    checked={selectedMaterial === "cotton"}
                  />
                  <img
                    src={cottonImg}
                    className={`w-12 h-12 rounded-full border ${
                      selectedMaterial === "cotton"
                        ? "border-blue-500 border-2"
                        : "border-gray-200"
                    }`}
                  />
                  <span className="text-xs mt-1">Cotton</span>
                </label>
                <label className="flex flex-col items-center cursor-pointer">
                  <input
                    type="radio"
                    name="fabric"
                    className="sr-only"
                    onChange={() => setSelectedMaterial("lua")}
                    checked={selectedMaterial === "lua"}
                  />
                  <img
                    src={polyesterImg}
                    className={`w-12 h-12 rounded-full border ${
                      selectedMaterial === "lua"
                        ? "border-blue-500 border-2"
                        : "border-gray-200"
                    }`}
                  />
                  <span className="text-xs mt-1">Lụa</span>
                </label>
                <label className="flex flex-col items-center cursor-pointer">
                  <input
                    type="radio"
                    name="fabric"
                    className="sr-only"
                    onChange={() => setSelectedMaterial("kaki")}
                    checked={selectedMaterial === "kaki"}
                  />
                  <img
                    src={woolImg}
                    className={`w-12 h-12 rounded-full border ${
                      selectedMaterial === "kaki"
                        ? "border-blue-500 border-2"
                        : "border-gray-200"
                    }`}
                  />
                  <span className="text-xs mt-1">Kaki</span>
                </label>
              </div>
            </div>

            {/* Màu sắc */}
            <div>
              <h3 className="font-semibold mb-2">Màu sắc</h3>
              <div className="flex gap-3">
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="color"
                    className="sr-only"
                    onChange={() => setSelectedColor("blue")}
                    checked={selectedColor === "blue"}
                  />
                  <div
                    className={`w-8 h-8 rounded-full bg-blue-600 border-2 ${
                      selectedColor === "blue" ? "border-blue-500" : "border-black"
                    } cursor-pointer`}
                  ></div>
                </label>
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="color"
                    className="sr-only"
                    onChange={() => setSelectedColor("black")}
                    checked={selectedColor === "black"}
                  />
                  <div
                    className={`w-8 h-8 rounded-full bg-black border-2 ${
                      selectedColor === "black" ? "border-blue-500" : "border-black"
                    } cursor-pointer`}
                  ></div>
                </label>
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    name="color"
                    className="sr-only"
                    onChange={() => setSelectedColor("red")}
                    checked={selectedColor === "red"}
                  />
                  <div
                    className={`w-8 h-8 rounded-full bg-red-700 border-2 ${
                      selectedColor === "red" ? "border-blue-500" : "border-black"
                    } cursor-pointer`}
                  ></div>
                </label>
              </div>
            </div>
          </div>

          <div className="mt-5 mb-5">
        <Button
          className="w-full"
          onClick={() =>
            handleAddToCart(productDetails?._id, productDetails?.totalStock)
          }
        >
          Thêm vào giỏ hàng
        </Button>
      </div>
          <Separator />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;