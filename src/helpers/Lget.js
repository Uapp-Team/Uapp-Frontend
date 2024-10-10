import Axios from "axios";
import { leadApi } from "../constants/constants";
import { expireDateHandler } from "./checkExpireDate";

const AuthStr = localStorage.getItem("token");

async function Lget(url) {
  try {
    expireDateHandler();
    const res = await Axios.get(`${leadApi}${url}`, {
      headers: {
        authorization: AuthStr,
      },
    });
    return await res?.data;
  } catch (error) {
    throw error;
  }
}

export default Lget;
