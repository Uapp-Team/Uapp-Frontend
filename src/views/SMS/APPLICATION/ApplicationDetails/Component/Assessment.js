import React, { useEffect, useState } from "react";
import get from "../../../../../helpers/get";
import succes from "../../../../../assets/icon/success.png";
import pending from "../../../../../assets/icon/pending.png";
import reject from "../../../../../assets/icon/reject.png";

const Assessment = ({ id, success }) => {
  const [details, setDetails] = useState(false);
  const [document, setDocument] = useState(false);
  const [profile, setProfile] = useState(false);
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    get(`ApplicationAssesment/GetByApplication/${id}`).then((res) => {
      setDetails(res?.applicationDetails);
      setDocument(res?.document);
      setProfile(res?.profile);
      setConsent(res?.consent);
    });
  }, [id, success]);

  const assessmentPercent =
    (details === 3 && 25) +
    (document === 3 && 25) +
    (profile === 3 && 25) +
    (consent === 3 && 25);

  return (
    <div className="custom-card-border p-4 mb-3 ">
      <div className="row">
        <div className="col-9">
          <h5>Application Assessment</h5>
        </div>
        <div className="col-3 text-right">
          <h5>{assessmentPercent}%</h5>
        </div>
      </div>

      <div className="my-4">
        <div className="row">
          <div className="col-9">
            <p>
              <b>Application Details</b>
            </p>
          </div>
          <div className="col-3 text-right">
            <img
              src={details === 3 ? succes : details === 1 ? pending : reject}
              alt=""
            />
          </div>
        </div>
        <div className="row">
          <div className="col-9">
            <p>
              <b>Document</b>
            </p>
          </div>
          <div className="col-3 text-right">
            <img
              src={document === 3 ? succes : document === 1 ? pending : reject}
              alt=""
            />
          </div>
        </div>
        <div className="row">
          <div className="col-9">
            <p>
              <b>Profile</b>
            </p>
          </div>
          <div className="col-3 text-right">
            <img
              src={profile === 3 ? succes : profile === 1 ? pending : reject}
              alt=""
            />
          </div>
        </div>
        <div className="row">
          <div className="col-9">
            <p>
              <b>Consent</b>
            </p>
          </div>
          <div className="col-3 text-right">
            <img
              src={consent === 3 ? succes : consent === 1 ? pending : reject}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
