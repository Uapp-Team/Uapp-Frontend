import React, { useState } from "react";
import { Modal } from "reactstrap";
import StudentRegRefer from "../../../../../components/Refer/StudentRegRefer";

const Refer = () => {
  const referenceId = localStorage.getItem("referenceId");
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
        <StudentRegRefer
          apiUrl={`Consultant/referral/${referenceId}`}
          modalClose={() => setModalShow(false)}
          setModalShow={setModalShow}
        />
      </Modal>
    </div>
  );
};

export default Refer;
