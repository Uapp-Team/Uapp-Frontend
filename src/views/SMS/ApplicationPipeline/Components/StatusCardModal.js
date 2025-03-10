import React, { useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import ApplicationList from "./ApplicationList";
import { Modal } from "reactstrap";
import { ModalBody } from "react-bootstrap";

const StatusCardModal = ({
  title,
  applications,
  students,
  applicationList,
  confidence = null,
  bgColor = "#EDF2F2",
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        className="p-16px rounded mb-3"
        style={{
          backgroundColor: bgColor,
          border: "1px solid #CDDFDF",
          minHeight: "169px",
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div className="">{title}</div>
          {confidence !== null && (
            <div className="w-25 d-flex justify-content-end">
              <div
                style={{
                  backgroundColor: confidence >= 1 ? "#34C759" : "#ddd",
                }}
                className="w-25 h-8px rounded-left"
              ></div>
              <div
                style={{
                  backgroundColor: confidence >= 2 ? "#34C759" : "#ddd",
                }}
                className="w-25 mx-1 h-8px "
              ></div>
              <div
                style={{
                  backgroundColor: confidence >= 3 ? "#34C759" : "#ddd",
                }}
                className="w-25 h-8px rounded-right"
              ></div>
            </div>
          )}
        </div>
        <div className="row mb-24px mt-20px">
          <div className="col">
            <span className="fs-22px fw-600">{applications}</span>
            <span className="fs-12px"> Applications</span>
          </div>
          <div className="col">
            <span className="fs-22px fw-600">{students}</span>
            <span className="fs-12px"> Student</span>
          </div>
        </div>

        {applicationList?.length > 0 && (
          <button
            className="btn-view-application"
            onClick={() => setModalOpen(true)}
          >
            View Application <AiOutlineRight />
          </button>
        )}
      </div>

      <Modal
        isOpen={modalOpen}
        toggle={() => setModalOpen(!modalOpen)}
        className="modal-xl center"
      >
        <ModalBody className="p-4">
          <ApplicationList
            applicationList={applicationList}
            modalClose={() => setModalOpen(false)}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default StatusCardModal;
