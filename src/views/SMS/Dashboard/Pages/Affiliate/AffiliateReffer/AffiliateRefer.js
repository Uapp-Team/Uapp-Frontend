import React, { useState } from "react";
import { Modal } from "reactstrap";
import InvitationAffiliateRefer from "./InvitationAffiliateRefer";

const AffiliateRefer = () => {
  const referenceId = localStorage.getItem("referenceId");
  const userViewId = JSON.parse(localStorage.getItem("current_user"));

  const [modalShow, setModalShow] = useState(false);
  return (
    <div>
      <div
        onClick={() => {
          setModalShow(true);
        }}
        className="refer-button"
      >
        <i class="fas fa-share-alt"></i>
      </div>

      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        isOpen={modalShow}
        toggle={() => setModalShow(false)}
        centered
      >
        <InvitationAffiliateRefer
          apiUrl={`Consultant/referral/${referenceId}`}
          userViewId={userViewId}
          modalClose={() => setModalShow(false)}
          setModalShow={setModalShow}
        />
      </Modal>
    </div>
  );
};

export default AffiliateRefer;
