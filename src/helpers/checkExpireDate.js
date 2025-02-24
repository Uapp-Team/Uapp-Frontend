import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { rootUrl } from "../constants/constants";
import { logoutStorageHandler } from "./logoutStorageHandler";

const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000; // Compare expiry with current timestamp
  } catch {
    return true; // If token is invalid, consider it expired
  }
};

export const expireDateHandler = async () => {
  const authToken = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!authToken || !refreshToken) {
    logoutStorageHandler();
    window.location.href = "/sessionTimeOut";
    return;
  }

  if (isTokenExpired(authToken)) {
    try {
      // Try refreshing the token
      const response = await axios.put(
        `${rootUrl}account/RenewToken?refreshToken=${refreshToken}`
      );

      if (response.status === 200 && response.data?.authToken) {
        // Store new tokens
        localStorage.removeItem("token");
        localStorage.setItem("token", ` Bearer ${response.data.authToken}`);

        localStorage.removeItem("refreshToken");
        localStorage.setItem("refreshToken", response.data.refreshToken);

        localStorage.removeItem("date");
        localStorage.setItem("date", response.data.expireDate);
      } else if (response.status === 401) {
        logoutStorageHandler();
        window.location.href = "/sessionTimeOut";
      } else {
        throw new Error("Unauthorized");
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      logoutStorageHandler();
      window.location.href = "/login";
    }
  }
  return localStorage.getItem("token");
};
