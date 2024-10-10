import React from "react";
import { useParams } from "react-router-dom";
import ProfileReview from "./ProfileComponent/ProfileReview";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import RatingBreakdown from "./ProfileComponent/RatingBreakdown";
import ProfileHeadCardForView from "./ProfileComponent/ProfileHeadCardForView";
import ProfileRatingsBreakdown from "./ProfileComponent/ProfileRatingsBreakdown";

const ConsultantProfileForStudent = () => {
  const { id } = useParams();

  return (
    <>
      <BreadCrumb title="Consultant Profile" backTo="" path="/" />

      <div className="row">
        <div className="col-lg-8 col-sm-12">
          <ProfileHeadCardForView id={id} />
          {/* <RatingBreakdown id={id} /> */}
          <ProfileReview id={id} />
        </div>

        <div className="col-lg-4 col-sm-12">
          {/* <Consent id={id} /> */}

          <iframe
            className="w-100"
            height="177"
            src="https://www.youtube.com/embed/V685_4XUz2Q"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            style={{ marginBottom: "19px" }}
          ></iframe>
          <div>
            <ProfileRatingsBreakdown id={id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsultantProfileForStudent;
