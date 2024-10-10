import Axios from "axios";

import history from "./history";
import { leadApi, rootUrl } from "../constants/constants";
import { expireDateHandler } from "./checkExpireDate";

const AuthStr = localStorage.getItem("token");
async function Lput(url, body = {}, authToken = "") {
  try {
    expireDateHandler();
    const res = await Axios.put(`${leadApi}${url}`, body, {
      headers: {
        authorization: AuthStr,
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

export default Lput;
