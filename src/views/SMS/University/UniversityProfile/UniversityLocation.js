import React from "react";
import { Link } from "react-router-dom";

const UniversityLocation = ({ uniData, campData }) => {
  return (
    <div className="">
      <div className="aboutContentHeader mb-2">Location</div>

      <div className="mt-3">
        <iframe
          src={uniData?.locationOnGoogleMap}
          width="100%"
          height="400"
          loading="lazy"
          style={{ border: "0" }}
          referrerpolicy="no-referrer-when-downgrade"
          title="efef"
        ></iframe>
      </div>
      <div className="mt-3">{uniData?.location}</div>

      <div className="aboutContentHeader mb-2 mt-4">Campuses</div>

      <div className="row">
        {campData.map((camp, i) => (
          <div
            style={{ marginTop: "27px", marginBottom: "27px" }}
            key={i}
            className="col-12 col-md-6"
          >
            <div className="campusCard">
              <div className="campName">{camp?.name}</div>
              <div className="campusAddressInfo">
                {camp?.addressLine}
                {","}
                <br />
                {camp?.universityCountry?.name}
                {","}
                <br />
                {camp?.universityCity?.name}
                {","} {camp?.universityState?.name}
              </div>

              <div className="directionText">
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to={`/campusDetails/${camp?.id}`}
                >
                  <span style={{ cursor: "pointer" }}>
                    View Profile <i className="fas fa-arrow-right ml-1"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UniversityLocation;
