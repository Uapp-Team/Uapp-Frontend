import Axios from "axios";
import { rootUrl } from "../constants/constants";
import { expireDateHandler } from "./checkExpireDate";
import history from "./history";
const AuthStr = localStorage.getItem("token");

async function Uremove(url, body = {}, authToken = "") {
  try {
    expireDateHandler();
    const res = await Axios.delete(`${rootUrl}${url}`, {
      headers: {
        authorization: AuthStr,
      },
    });
    return await res;
  } catch (error) {
    if (error.response.status === 404) {
      history.push("/404");
    }

    return error.response;
  }
}

export default Uremove;
