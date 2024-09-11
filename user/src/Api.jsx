import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { addressActions } from "./store/addressSlice";
import { bagActions } from "./store/bagSlice";

export const Api = () => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const URI = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    
    const fetchData = async () => {
      try {
        // Dispatch action to indicate fetch is in progress
        dispatch({ type: 'FETCH_STATUS_LOADING' });

        await fetchAddress(signal);
        await fetchItems(signal);
        await fetchUserDetails(signal);

        // Dispatch action to indicate fetch is successful
        dispatch({ type: 'FETCH_STATUS_SUCCESS' });

      } catch (error) {
        console.error("Error in fetchData", error);

        // Dispatch action to indicate an error occurred
        dispatch({ type: 'FETCH_STATUS_ERROR', error: error.message });
      }
    };

    fetchData();

    // Cleanup function to abort fetches on unmount
    return () => controller.abort();
  }, [dispatch, userId, URI]);

  const fetchAddress = async (signal) => {
    try {
      const resp = await axios.get(`${URI}api/user/get-address/${userId}`, { signal });
      // console.log("fetchAddress",resp.data.address);
      dispatch(addressActions.updateAddress(resp.data.address));
    } catch (error) {
      console.error("Error fetching address", error);
    }
  };

  const fetchItems = async (signal) => {
    try {
      const resp = await axios.get(`${URI}api/cart/totalProductQuantity/${userId}`, { signal });
      dispatch(bagActions.addToBag(resp.data));
    } catch (error) {
      console.error("Error fetching items", error);
    }
  };

  const fetchUserDetails = async (signal) => {
    try {
      const resp = await axios.get(`${URI}user/getUser/${userId}`, { signal });
      console.log("User details:", resp.data);
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  };

  return <div></div>; 
};
