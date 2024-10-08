import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileReview from "./ProfileComponent/ProfileReview";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import ProfileHeadCardForView from "./ProfileComponent/ProfileHeadCardForView";
import RatingBreakdown from "./ProfileComponent/RatingBreakdown";
import get from "../../../../helpers/get";
import { Card } from "reactstrap";

const ConsultantForParentProfile = () => {
  const { id } = useParams();
  const [branch, setConsultantBranch] = useState({});

  useEffect(() => {
    get(`ConsultantProfile/GetBranch/${id}`).then((res) => {
      setConsultantBranch(res);
    });
  }, [])
  return (
    <>
      <BreadCrumb title="Parent Consultant Profile" backTo="" path="/" />

      <div className="row">
        <div className="col-lg-8 col-sm-12">
          <ProfileHeadCardForView id={id} />
          {/* <RatingBreakdown id={id} /> */}
          {/* <ProfileReview id={id} /> */}
        </div>
        <div className="col-lg-4 col-sm-12">
          <div>
            {branch === null ? null : (
              <Card className="p-4">
                <h5 className="mb-4">Consultant at</h5>
                <span>{branch?.branchName}</span>
                <span className="text-gray-70">{branch?.address}</span>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConsultantForParentProfile;
