import React from "react";
import { rootUrl } from "../../constants/constants";

const Download = ({ url, className, fileName }) => {
  const AuthStr = localStorage.getItem("token");

  const onClick = () => {
    fetch(`${rootUrl}${url}`, {
      method: "GET",
      headers: {
        authorization: AuthStr,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.blob(); // Get the response as a blob
        }
        throw new Error("File download failed");
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(
          new Blob([blob], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName); // Specify the file name
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
  };

  return (
    <span className={`pointer ${className}`} onClick={onClick}>
      <i class="fas fa-arrow-down"></i>
    </span>
  );
};

export default Download;
