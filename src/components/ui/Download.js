import React from "react";
import { rootUrl } from "../../constants/constants";

const Download = ({ fileurl, fileName }) => {
  const handleDownload = () => {
    fetch(`${rootUrl + fileurl}`)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => console.error("Error downloading :", error));
  };

  return (
    <>
      <i
        class="fas fa-arrow-circle-down text-success fs-24px pointer"
        onClick={handleDownload}
      ></i>
    </>
  );
};

export default Download;
