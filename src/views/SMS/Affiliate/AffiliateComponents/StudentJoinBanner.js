import React, { useEffect, useState } from "react";
import banner from "../../../../assets/img/affiliate-join-banner.png";
import { Link } from "react-router-dom/cjs/react-router-dom";
import get from "../../../../helpers/get";

const StudentJoinBanner = () => {
  const [canConsultant, setCanConsultant] = useState(false);
  const currentUser = JSON?.parse(localStorage.getItem("current_user"));

  useEffect(() => {
    get(`Student/CanBecomeReferrer/${currentUser?.referenceId}`).then((res) => {
      setCanConsultant(res);
    });
  }, [currentUser]);

  return (
    <>
      {canConsultant && (
        <div
          className="bg-affiliate-join m-3 py-4"
          style={{
            backgroundImage: `url(${banner})`,
          }}
        >
          <div className="text-center">
            <p className="fs-14px fw-700 text-white">Referrer program</p>
            <Link to={`/becomeReferrer`}>
              <button type="button" className="save-button mb-4">
                Join Now
              </button>
            </Link>
          </div>
          <p className="fs-12px text-white fw-700">
            Refer a Friend & <br /> <b>Earn £100</b>
          </p>
        </div>
      )}
    </>
  );
};

export default StudentJoinBanner;
