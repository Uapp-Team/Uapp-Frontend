import Axios from "axios";
import { rootUrl } from "../constants/constants";
import { expireDateHandler } from "./checkExpireDate";

const AuthStr = localStorage.getItem("token");

async function get(url) {
  try {
    expireDateHandler();
    const res = await Axios.get(`${rootUrl}${url}`, {
      headers: {
        authorization: AuthStr,
      },
    });
    return await res?.data?.result;
  } catch (error) {
    throw error;
  }
}

export default get;
