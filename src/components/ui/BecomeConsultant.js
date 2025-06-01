import React, { useEffect, useState } from "react";
import banner from "../../assets/img/becomeconsultantbanner.png";
import { Link } from "react-router-dom/cjs/react-router-dom";
import get from "../../helpers/get";
import { FormGroup, Modal, ModalBody } from "reactstrap";
import CancelButton from "../buttons/CancelButton";
import ConfirmModal from "../modal/ConfirmModal";

const BecomeConsultant = ({ className }) => {
  const [canConsultant, setCanConsultant] = useState(false);
  const currentUser = JSON?.parse(localStorage.getItem("current_user"));
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    get(`Student/CanBecomeConsultant/${currentUser?.referenceId}`).then(
      (res) => {
        setCanConsultant(res);
      }
    );
  }, [currentUser]);

  return (
    <>
      <div
        className="bg-affiliate-join"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <div className={className}>
          <p className="fs-16px fw-700 text-white">
            Earn unlimited by Consulting
          </p>

          {canConsultant ? (
            <Link to={`/becomeConsultant`}>
              <button type="button" class="save-button">
                Join Now
              </button>
            </Link>
          ) : (
            <button
              type="button"
              class="save-button"
              onClick={() => {
                setModalShow(true);
              }}
            >
              Join Now
            </button>
          )}
        </div>
      </div>

      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        isOpen={modalShow}
        toggle={() => setModalShow(false)}
        centered
      >
        <ModalBody className="p-5">
          {" "}
          <h6>
            If You Want To Become A Consultant, You Need To Get An Unconditional
            Offer Letter From University
          </h6>
          <FormGroup className="text-left mt-4">
            <CancelButton text="Ok" cancel={() => setModalShow(false)} />
          </FormGroup>
        </ModalBody>
      </Modal>
    </>
  );
};

export default BecomeConsultant;
