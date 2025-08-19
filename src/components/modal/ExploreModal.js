import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CancelButton from "../buttons/CancelButton";
import ButtonForFunction from "../../views/SMS/Components/ButtonForFunction";
import checkCircle from "../../assets/img/hundredPercent.svg";
import { useHistory } from "react-router";

const ExploreModal = ({ text, text2, text3, cancel, isOpen = true }) => {
  const history = useHistory();

  const exploreMore = () => {
    history.push("/consultant-onboarding-video-quiz");
  };

  return (
    <>
      <Modal isOpen={isOpen} className="uapp-modal">
        <ModalHeader className="py-4"></ModalHeader>
        <ModalBody style={{ padding: "30px" }}>
          <div className="text-center mb-3 text-gray-70">
            <p className="fs-18px font-weight-bold">{text}</p>
            <p className="fs-22px">{text2}</p>
            <img className="my-3" src={checkCircle} alt="" />
            <p>{text3}</p>
          </div>
          {/* <div className="mb-3"></div> */}
        </ModalBody>
        <ModalFooter className="justify-content-center">
          <ButtonForFunction
            func={exploreMore}
            className={"btn btn-uapp-add "}
            name={"Explore"}
            permission={6}
          />
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ExploreModal;
