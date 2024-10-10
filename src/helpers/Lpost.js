import axios from "axios";

import history from "./history";
import { leadApi } from "../constants/constants";
import { expireDateHandler } from "./checkExpireDate";

const AuthStr = localStorage.getItem("token");

async function Lpost(url, body = {}, authToken = "") {
  try {
    expireDateHandler();
    const res = await axios.post(`${leadApi}${url}`, body, {
      headers: {
        authorization: AuthStr,
      },
    });
    return await res;
  } catch (error) {
    if (error?.response?.status === 404) {
      history.push("/404");
    }

    return error?.response;
  }
}

export default Lpost;
