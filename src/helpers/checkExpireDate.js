import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { rootUrl } from "../constants/constants";
import { logoutStorageHandler } from "./logoutStorageHandler";

// Check if token is expired - removed async since it's not needed
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    // Add a buffer of 60 seconds to prevent edge cases
    return decoded.exp < Date.now() / 1000 - 60;
  } catch {
    return true; // If token is invalid, consider it expired
  }
};

// Token renewal in progress flag to prevent multiple simultaneous refresh attempts
let isRefreshingToken = false;
// Queue of callbacks to execute once token refresh completes
let refreshCallbacks = [];
// Store the promise for current refresh operation
let refreshTokenPromise = null;

// Function to add callbacks to the queue
const addCallbackToQueue = (callback) => {
  refreshCallbacks.push(callback);
};

// Function to process the callback queue with the new token
const processCallbackQueue = (newToken) => {
  refreshCallbacks.forEach((callback) => callback(newToken));
  refreshCallbacks = [];
};

export const expireDateHandler = async () => {
  const authToken = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  // If no tokens exist, redirect to login
  if (!authToken || !refreshToken) {
    logoutStorageHandler();
    window.location.href = "/sessionTimeOut";
    return false;
  }

  // If token is valid, return it immediately
  if (!isTokenExpired(authToken)) {
    return authToken;
  }

  // Token is expired, we need to refresh

  // If refresh is already in progress, return the existing promise
  if (refreshTokenPromise) {
    return refreshTokenPromise;
  }

  // Start refreshing token
  isRefreshingToken = true;

  // Create the refresh token promise
  refreshTokenPromise = new Promise(async (resolve) => {
    try {
      const response = await axios.put(
        `${rootUrl}account/RenewToken?refreshToken=${refreshToken}`
      );

      if (response.status === 200 && response.data?.authToken) {
        // Store new tokens
        const newToken = `Bearer ${response.data.authToken}`;

        localStorage.setItem("token", newToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("date", response.data.expireDate);

        // Process any queued requests
        processCallbackQueue(newToken);
        resolve(newToken);
      } else {
        throw new Error("Invalid response from refresh token endpoint");
      }
    } catch (error) {
      console.error("Token refresh failed:", error);

      // Clear the queue with error
      processCallbackQueue(false);

      // Log out and redirect
      logoutStorageHandler();
      window.location.href = "/sessionTimeOut";
      resolve(false);
    } finally {
      // Reset flags and promise
      isRefreshingToken = false;
      refreshTokenPromise = null;
    }
  });

  return refreshTokenPromise;
};

// Initialize a listener to ensure token check happens only once on page load
let hasCheckedTokenOnLoad = false;

export const initializeTokenCheck = () => {
  if (!hasCheckedTokenOnLoad) {
    hasCheckedTokenOnLoad = true;

    // Check token validity once when page loads
    setTimeout(() => {
      expireDateHandler().then((token) => {
        console.log("Token initialized:", token ? "Valid" : "Invalid");
      });
    }, 0);
  }
};
