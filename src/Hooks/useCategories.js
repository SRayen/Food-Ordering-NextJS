import useSWR from "swr";
import axios from "axios";

// Custom hook for fetching categories
export const useCategories = () => {
  const {
    data: categories,
    error,
    isLoading,
  } = useSWR("categories", async () => {
    const response = await axios.get("/api/category");
    return response.data;
  });

  return { categories, error, isLoading };
};
