import React, { useEffect, useState } from "react";
import { Modal } from "reactstrap";
import StudentRegRefer from "../../../../../components/Refer/StudentRegRefer";
import get from "../../../../../helpers/get";

const Refer = () => {
  const referenceId = localStorage.getItem("referenceId");
  const [modalShow, setModalShow] = useState(false);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    get(`Consultant/Status/${referenceId}`).then((res) => {
      setStatus(res);
    });
  }, [referenceId]);

  return (
    <div>
      <div
        onClick={() => {
          status && setModalShow(true);
        }}
        className={`refer-button ${!status && "bg-gray"}`}
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
