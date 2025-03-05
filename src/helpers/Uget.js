import Axios from "axios";
import { rootUrl } from "../constants/constants";
import { expireDateHandler } from "./checkExpireDate";

async function Uget(url) {
  try {
    const token = await expireDateHandler();
    const res = await Axios.get(`${rootUrl}${url}`, {
      headers: {
        authorization: token,
      },
    });
    return await res?.data;
  } catch (error) {
    throw error;
  }
}

export default Uget;
