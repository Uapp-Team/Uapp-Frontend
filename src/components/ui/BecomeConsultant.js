import React, { useEffect, useState } from "react";
import banner from "../../assets/img/becomeconsultantbanner.png";
import { Link } from "react-router-dom/cjs/react-router-dom";
import get from "../../helpers/get";

const BecomeConsultant = ({ className }) => {
  const [canConsultant, setCanConsultant] = useState(false);
  const currentUser = JSON?.parse(localStorage.getItem("current_user"));

  useEffect(() => {
    get(`Student/CanBecomeConsultant/${currentUser?.referenceId}`).then(
      (res) => {
        setCanConsultant(res);
      }
    );
  }, [currentUser]);

  return (
    <>
      {canConsultant && (
        <div
          className="bg-affiliate-join"
          style={{
            backgroundImage: `url(${banner})`,
          }}
        >
          <div className={className}>
            <p className="fs-16px fw-700 text-white">
              Earn unlimited by counselling
            </p>
            <Link to={`/becomeConsultant`}>
              <button type="button" class="save-button">
                Join Now
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default BecomeConsultant;
