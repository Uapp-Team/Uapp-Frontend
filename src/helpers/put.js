import Axios from "axios";

import { rootUrl } from "../constants/constants";
import { expireDateHandler } from "./checkExpireDate";
import history from "./history";

const AuthStr = localStorage.getItem("token");
async function put(url, body = {}, authToken = "") {
  try {
    const token = await expireDateHandler();
    const res = await Axios.put(`${rootUrl}${url}`, body, {
      headers: {
        authorization: token,
      },
    });
    return await res;
  } catch (error) {
    if (error.response.status === 404) {
      history.push("/404");
    }
    // else if(error.response.status === 400){
    //   history.push('/400')
    // }

    // return error;
    return error.response;
  }
}

export default put;
