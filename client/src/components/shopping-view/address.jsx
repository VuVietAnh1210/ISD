import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editaAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { useToast } from "../ui/use-toast";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  notes: "",
};

const initialErrors = {
  phone: "",
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [errors, setErrors] = useState(initialErrors);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();

  // Sửa hàm validatePhoneNumber
  const validatePhoneNumber = (phone) => {
    // Không hiển thị lỗi nếu ô số điện thoại trống
    if (!phone || phone.trim() === "") {
      return "";
    }

    const phoneRegex = /^0\d{9}$/; // Bắt đầu bằng 0 và có đúng 10 chữ số
    if (!phoneRegex.test(phone)) {
      return "Số điện thoại không hợp lệ. Vui lòng nhập lại";
    }
    return "";
  };

  const handleFormChange = (newFormData) => {
    setFormData(newFormData);
    const phoneError = validatePhoneNumber(newFormData.phone);
    setErrors({ ...errors, phone: phoneError });
  };

  function handleManageAddress(event) {
    event.preventDefault();

    const phoneError = validatePhoneNumber(formData.phone);
    if (phoneError) {
      setErrors({ ...errors, phone: phoneError });
      toast({
        title: phoneError,
        variant: "destructive",
      });
      return;
    }

    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialAddressFormData);
      setErrors(initialErrors);
      toast({
        title: "Bạn chỉ có thể thêm tối đa 3 địa chỉ",
        variant: "destructive",
      });
      return;
    }

    currentEditedId !== null
      ? dispatch(
          editaAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            setErrors(initialErrors);
            toast({
              title: "Địa chỉ đã được cập nhật thành công",
            });
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setFormData(initialAddressFormData);
            setErrors(initialErrors);
            toast({
              title: "Địa chỉ đã được thêm thành công",
            });
          }
        });
  }

  function handleDeleteAddress(getCurrentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        toast({
          title: "Địa chỉ đã được xóa thành công",
        });
      }
    });
  }

  function handleEditAddress(getCuurentAddress) {
    setCurrentEditedId(getCuurentAddress?._id);
    const newFormData = {
      ...formData,
      address: getCuurentAddress?.address,
      city: getCuurentAddress?.city,
      phone: getCuurentAddress?.phone,
      notes: getCuurentAddress?.notes,
    };
    setFormData(newFormData);
    const phoneError = validatePhoneNumber(newFormData.phone);
    setErrors({ ...errors, phone: phoneError });
  }

  function isFormValid() {
    return (
      Object.keys(formData)
        .map((key) => formData[key].trim() !== "")
        .every((item) => item) && !errors.phone
    );
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch]);

  console.log(addressList, "addressList");

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddressItem) => (
              <AddressCard
                key={singleAddressItem._id}
                selectedId={selectedId}
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={singleAddressItem}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Sửa địa chỉ" : "Thêm địa chỉ mới"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={handleFormChange}
          buttonText={currentEditedId !== null ? "Sửa" : "Thêm"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
          errors={errors}
        />
      </CardContent>
    </Card>
  );
}

export default Address;