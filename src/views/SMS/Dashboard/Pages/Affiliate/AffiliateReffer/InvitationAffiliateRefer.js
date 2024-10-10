import React, { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import put from "../../../../../../helpers/put";
import { Col, Form, FormGroup, Input, ModalBody } from "reactstrap";
import anotherFriend from "../../../../../../assets/img/refer-friend-icon.svg";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import referFriend from "../../../../../../assets/img/refer-friend.svg";
import CopyButton from "../../../../../../components/Refer/CopyButton";
import SocialShare from "../../../../../../components/Refer/SocialShare";
import post from "../../../../../../helpers/post";

const InvitationAffiliateRefer = ({
  apiUrl,
  setModalShow,
  modalClose,
  userViewId,
}) => {
  const [Name, setName] = useState("");
  const { addToast } = useToasts();
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    post(`AffiliateInvitation/Invite/${Name}`).then((res) => {
      if (res?.status === 200 && res?.data?.isSuccess == true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: "true",
        });
        setSuccess(!success);
        setName("");
      } else {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: "error",
        });
      }
    });
  };

  // useEffect(() => {
  //   get(apiUrl).then((res) => {
  //     setReferId(res);
  //   });
  // }, [apiUrl]);

  const url = `https://portal.uapp.uk/studentRegister/${userViewId.userViewId}`;
  return (
    <div>
      <h5 className="d-flex justify-content-between px-4 mt-4">
        <span>Refer Code</span>
        <i class="fas fa-times cursor-pointer" onClick={modalClose}></i>
      </h5>
      <hr />

      <ModalBody className="px-4">
        {success ? (
          <>
            <div className="text-center mx-auto mb-4">
              <img src={anotherFriend} alt="" />
            </div>
            <div className="text-center mx-auto mb-4">
              <h5
                style={{
                  color: "#202827",
                  fontWeight: "600",
                  lineHeight: "30px",
                }}
              >
                Thank you! Your friend will receive an <br /> email invitation
                shortly.
              </h5>
            </div>

            <div className="text-center mx-auto mb-4">
              <p style={{ color: "#7C7C7C" }}>Want to refer more friends?</p>
            </div>
            <div className="text-center mx-auto mb-4">
              <SaveButton
                text="Invite another friend"
                action={() => {
                  setSuccess(false);
                }}
              />
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className="text-center mx-auto mb-4">
              <img src={referFriend} alt="" />
            </div>
            <div>
              <div className="mb-4">
                <Form onSubmit={handleSubmit}>
                  <FormGroup row className="has-icon-left position-relative">
                    <Col md="11">
                      <span
                        style={{
                          color: "#202827",
                          fontSize: "15px",
                          fontWeight: 500,
                        }}
                      >
                        Enter your friend's email address
                      </span>
                      <Input
                        type="email"
                        name="name"
                        id="name"
                        value={Name}
                        placeholder="Enter email"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup className="text-center mx-auto mb-4">
                    <SaveButton text="Send Invitation" />
                  </FormGroup>
                </Form>
              </div>

              <div className="position-relative hr-refer mx-1">
                <hr />
                <p className="refer-hr-text">or</p>
              </div>

              <div className="text-center mx-auto mb-4">
                <p style={{ color: "#7C7C7C" }}>Share link with your friends</p>
              </div>

              <div className="d-flex justify-content-between align-items-center copy-text mx-auto w-75">
                <p className="mb-0 text-ellipsis mr-1">{url}</p>
                <CopyButton text={url} />
              </div>
              <SocialShare
                description={"this is a basic share page"}
                url={url}
              ></SocialShare>
            </div>
          </>
        )}

        <div>
          <hr />
          <p className="mx-1" style={{ fontSize: "10px" }}>
            We respect your privacy and your friend's privacy. Their information
            will only be used to
            <p className="text-center mx-auto">send this invitation.</p>
          </p>
        </div>
      </ModalBody>
    </div>
  );
};

export default InvitationAffiliateRefer;
