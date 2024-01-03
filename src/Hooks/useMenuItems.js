import useSWR from "swr";
import axios from "axios";

// Custom hook for fetching categories
export const useMenuItems = () => {
  const {
    data: menuItems,
    error,
    isLoading,
  } = useSWR("menuItems", async () => {
    const response = await axios.get("/api/menu");
    return response.data;
  });

  return { menuItems, error, isLoading };
};
