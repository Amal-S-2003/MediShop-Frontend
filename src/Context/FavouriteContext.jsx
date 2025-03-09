import { createContext, useEffect, useState } from "react";
import { getUserFavourites } from "../services/allAPIS";

export const FavouriteContext = createContext();

export const FavouriteContextProvider = (props) => {
  const [favouriteItems, setFavouriteItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favCount, setFavCount] = useState(0); // Favourites count

  // ✅ Fetch Favourites
  const fetchFavourites = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (token) {
        const header = { authorization: `Bearer ${token}` };

        const response = await getUserFavourites(header);
        console.log(response);

        if (response.status === 200) {
          setFavouriteItems(response.data);
          setFavCount(response.data.length);
        }
      } else {
        setLoading(false);
        console.log("Please log in.");
      }
    } catch (error) {
      console.log("Failed to fetch favourites.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFavourites();
  }, []);
  const value = {
    favouriteItems,
    setFavouriteItems,
    loading,
    setLoading,
    fetchFavourites,
    favCount,
    setFavCount,
  };
  return (
    <FavouriteContext.Provider value={value}>
      {props.children}
    </FavouriteContext.Provider>
  );
};
