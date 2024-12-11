import React from "react";
import { rootUrl } from "../../constants/constants";

const DownloadButton = ({ file }) => {
  return (
    <>
      {file != null ? (
        <a href={rootUrl + file} target="blank">
          <button type="button" className="download-button mb-1 pointer">
            <i class="fas fa-arrow-down mr-2"></i> Download
          </button>{" "}
        </a>
      ) : (
        <button type="button" className="download-button mb-1 pointer">
          <i class="fas fa-arrow-down mr-2"></i> Download
        </button>
      )}
    </>
  );
};

export default DownloadButton;
