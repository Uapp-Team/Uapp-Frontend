import React from "react";
import { rootUrl } from "../../../../../constants/constants";

const CampusGallery = ({ gallery }) => {
  return (
    <div className="">
      {gallery.length > 0 ? (
        <div className="row">
          {gallery.map((gall, i) => (
            <div className="col-12 col-sm-2 col-md-4 mb-3">
              <div key={i} className="containerCustom">
                <img
                  src={rootUrl + gall?.mediaFileMedia?.thumbnailUrl}
                  alt="Avatar"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>There is no gallery item added here.</p>
      )}
    </div>
  );
};

export default CampusGallery;
