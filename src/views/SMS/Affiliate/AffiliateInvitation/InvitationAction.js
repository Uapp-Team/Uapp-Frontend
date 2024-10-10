import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { Modal, ModalBody } from "reactstrap";
import post from "../../../../helpers/post";

const InvitationAction = ({ text, email, data }) => {
  const { addToast } = useToasts();
  const [modal, setModal] = useState(false);

  const reSendEmail = (e) => {
    e.preventDefault();

    post(`AffiliateInvitation/Invite/${email}`).then((res) => {
      if (res?.status === 200 && res.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };
  console.log(text);
  return (
    <>
      {text === "Resend" ? (
        <span className="pointer" onClick={(e) => reSendEmail(e)}>
          {text}
        </span>
      ) : (
        <span className="pointer" onClick={(e) => setModal(true)}>
          {text}
        </span>
      )}

      <Modal
        isOpen={modal}
        toggle={() => setModal(!modal)}
        className="uapp-modal"
      >
        <ModalBody style={{ padding: "30px" }}>
          <h5>Invitation timeline</h5>
          <div className="overflowY-300p">
            <ul className="pt-3 pl-2">
              {data?.map((timeline, i) => (
                <li className="list" key={i}>
                  <div class="text-green">{timeline?.date}</div>
                  <p className="mb-0">
                    <b>{timeline?.status}</b>
                  </p>
                  <span>{timeline?.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default InvitationAction;
