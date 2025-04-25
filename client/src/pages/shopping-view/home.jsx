"use client"

import { Button } from "@/components/ui/button"
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice"
import ShoppingProductTile from "@/components/shopping-view/product-tile"
import { useNavigate } from "react-router-dom"
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice"
import { useToast } from "@/components/ui/use-toast"
import ProductDetailsDialog from "@/components/shopping-view/product-details"
import { getFeatureImages } from "@/store/common-slice"

const categoriesWithIcon = [
  { id: "men", label: "Nam", icon: ShirtIcon },
  { id: "women", label: "Nữ", icon: CloudLightning },
  // { id: "kids", label: "Kids", icon: BabyIcon },
  // { id: "accessories", label: "Accessories", icon: WatchIcon },
  // { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
]

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  // { id: "levi", label: "Levi's", icon: Airplay },
  // { id: "zara", label: "Zara", icon: Images },
  // { id: "h&m", label: "H&M", icon: Heater },
]

// Mảng chứa các ảnh banner mới
const bannerImages = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-OPcuO973OsXU3uK9se9srbI4AgecTr.png", // Áo Dài Gấm
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-JK9go8UbYcViO6i8ptmqYOKgPstc4d.png", // Bộ Sưu Tập 2025
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-tBSMF1ajSYitOeJ7YpK3wI7sY0XaQy.png", // Sale 30%
]

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { productList, productDetails } = useSelector((state) => state.shopProducts)
  const { featureImageList } = useSelector((state) => state.commonFeature)
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { toast } = useToast()

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters")
    const currentFilter = {
      [section]: [getCurrentItem.id],
    }

    sessionStorage.setItem("filters", JSON.stringify(currentFilter))
    navigate(`/shop/listing`)
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId))
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
        addToCart({
          userId: user?.id,
          productId: getCurrentProductId,
          quantity: 1,
        }),
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id))
        toast({
          title: "Sản phẩm đã được thêm vào giỏ hàng",
        })
      }
    })
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true)
  }, [productDetails])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerImages.length)
    }, 8000) // Giảm thời gian chuyển slide xuống 8 giây

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    dispatch(
        fetchAllFilteredProducts({
          filterParams: {},
          sortParams: "price-lowtohigh",
        }),
    )
  }, [dispatch])

  useEffect(() => {
    dispatch(getFeatureImages())
  }, [dispatch])

  return (
      <div className="flex flex-col min-h-screen pt-16">
        {/* Banner */}
        <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-gray-100">
          {bannerImages.map((image, index) => (
              <div
                  key={index}
                  className={`${
                      index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                  } absolute inset-0 transition-opacity duration-1000 ease-in-out`}
              >
                <img
                    src={image || "/placeholder.svg"}
                    alt={`Banner ${index + 1}`}
                    className="w-full h-full object-contain"
                />
              </div>
          ))}

          {/* Chỉ báo slide hiện tại */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {bannerImages.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-primary" : "bg-gray-300"}`}
                    aria-label={`Chuyển đến slide ${index + 1}`}
                />
            ))}
          </div>

          <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + bannerImages.length) % bannerImages.length)}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 z-20 rounded-full"
          >
            <ChevronLeftIcon className="w-4 h-4" />
          </Button>
          <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerImages.length)}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 z-20 rounded-full"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </Button>
        </div>


        {/* Sản phẩm ưu đãi */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-8">SẢN PHẨM ƯU ĐÃI</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productList && productList.length > 0
                  ? productList.map((productItem) => (
                      <ShoppingProductTile
                          key={productItem.id}
                          handleGetProductDetails={handleGetProductDetails}
                          product={productItem}
                          handleAddtoCart={handleAddtoCart}
                      />
                  ))
                  : null}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-8">SẢN PHẨM MỚI</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productList && productList.length > 0
                  ? productList.map((productItem) => (
                      <ShoppingProductTile
                          key={productItem.id}
                          handleGetProductDetails={handleGetProductDetails}
                          product={productItem}
                          handleAddtoCart={handleAddtoCart}
                      />
                  ))
                  : null}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-8">SẢN PHẨM BÁN CHẠY</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productList && productList.length > 0
                  ? productList.map((productItem) => (
                      <ShoppingProductTile
                          key={productItem.id}
                          handleGetProductDetails={handleGetProductDetails}
                          product={productItem}
                          handleAddtoCart={handleAddtoCart}
                      />
                  ))
                  : null}
            </div>
          </div>
        </section>

        {/* Dialog chi tiết sản phẩm */}
        <ProductDetailsDialog open={openDetailsDialog} setOpen={setOpenDetailsDialog} productDetails={productDetails} />
      </div>
  )
}

export default ShoppingHome;