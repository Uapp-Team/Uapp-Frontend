import Axios from "axios";
import { leadApi } from "../constants/constants";
import { expireDateHandler } from "./checkExpireDate";

async function Lget(url) {
  try {
    const token = await expireDateHandler();
    const route = url.includes("http") ? url : `${leadApi}${url}`;
    const res = await Axios.get(route, {
      headers: {
        authorization: token,
      },
    });
    return await res?.data;
  } catch (error) {
    throw error;
  }
}

export default Lget;
