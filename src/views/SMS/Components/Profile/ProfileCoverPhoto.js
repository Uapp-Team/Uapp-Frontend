import React from "react";
import { rootUrl } from "../../../../constants/constants";
import { useHistory } from "react-router-dom";

export default function ProfileCoverPhoto({ FileUrl, DefaultFile }) {
  const history = useHistory();

  // redirect to backUrl
  const backUrl = () => {
    history.go(-1);
  };

  return (
    <>
      {FileUrl ? (
        <div
          className="university_profile_head"
          style={{
            background: "url(" + rootUrl + FileUrl + ")",
          }}
        >
          <div className="university-profile-head-arrow">
            <i
              className="fas fa-arrow-left pointer text-white"
              onClick={backUrl}
            ></i>
          </div>
        </div>
      ) : (
        <div
          className="university_profile_head"
          style={{
            background: "url(" + DefaultFile + ")",
          }}
        >
          <div className="university-profile-head-arrow">
            <i
              className="fas fa-arrow-left pointer text-white"
              onClick={backUrl}
            ></i>
          </div>
        </div>
      )}{" "}
    </>
  );
}
