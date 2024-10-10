import Axios from "axios";
import { rootUrl } from "../constants/constants";
import { expireDateHandler } from "./checkExpireDate";

const AuthStr = localStorage.getItem("token");

async function Uget(url) {
  try {
    expireDateHandler();
    const res = await Axios.get(`${rootUrl}${url}`, {
      headers: {
        authorization: AuthStr,
      },
    });
    return await res?.data;
  } catch (error) {
    throw error;
  }
}

export default Uget;
