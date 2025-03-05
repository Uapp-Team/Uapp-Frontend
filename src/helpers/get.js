import Axios from "axios";
import { rootUrl } from "../constants/constants";
import { expireDateHandler } from "./checkExpireDate";

async function get(url) {
  try {
    var token = await expireDateHandler();
    const res = await Axios.get(`${rootUrl}${url}`, {
      headers: {
        authorization: token,
      },
    });
    return await res?.data?.result;
  } catch (error) {
    throw error;
  }
}

export default get;
