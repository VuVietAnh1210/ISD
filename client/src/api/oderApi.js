// client/src/api/orderApi.js
import axios from "axios";

const API_URL = "/api/orders"; // Bạn đã có route này trên backend rồi

export const getAllOrders = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
