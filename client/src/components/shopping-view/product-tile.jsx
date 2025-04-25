

import { formatPrice } from "@/lib/utils"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice"
import { useToast } from "@/components/ui/use-toast"

function ShoppingProductTile({ product, handleGetProductDetails }) {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { toast } = useToast()

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    if (!user) {
      toast({
        title: "Vui lòng đăng nhập để mua hàng",
        variant: "destructive",
      })
      return
    }

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
          title: "Đã thêm sản phẩm vào giỏ hàng",
        })
      }
    })
  }

  return (
      <div className="flex flex-col">
        <div className="relative overflow-hidden cursor-pointer" onClick={() => handleGetProductDetails(product?._id)}>
          <img
              src={product?.image || "/placeholder.svg"}
              alt={product?.title}
              className="w-full aspect-[3/4] object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="text-center mt-3">
          <h3 className="font-medium text-lg">{product?.title}</h3>
          <p className="text-gray-900">{formatPrice(product?.price)}</p>
        </div>
      </div>
  )
}

export default ShoppingProductTile

