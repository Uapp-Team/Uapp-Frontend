import axios from "axios";

import { rootUrl } from "../constants/constants";
import { expireDateHandler } from "./checkExpireDate";
import history from "./history";

async function post(url, body = {}, authToken = "") {
  try {
    const token = await expireDateHandler();
    const res = await axios.post(`${rootUrl}${url}`, body, {
      headers: {
        authorization: token,
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

export default post;
