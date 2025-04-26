import axios from "axios";

export const getTodayViews = async () => {
  const response = await axios.get("/api/views/today");
  return response.data.totalViews; // API backend phải trả về { totalViews: number }
};
