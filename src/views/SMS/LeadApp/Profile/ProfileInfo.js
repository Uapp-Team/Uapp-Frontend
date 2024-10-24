import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
// import LeadAssign from "../lead/LeadAssign";
// import EditBtn from "../../components/buttons/EditBtn";
import ProfileEdit from "./ProfileEdit";
import { LiaUserCircle } from "react-icons/lia";
// import Loading from "../../components/ui/Loading";
// import ErrorText from "../../components/ui/ErrorText";
import { MdOutlineMailOutline } from "react-icons/md";
import { AiOutlinePhone } from "react-icons/ai";
import ConvertStudent from "./convertStudent/ConvertStudent";
import get from "../../../../helpers/get";
import { Consultant } from "../../../../components/core/User";
import SaveButton from "../../../../components/buttons/SaveButton";
import EditBtn from "../../../../components/buttons/EditBtn";
import CardHeading from "../../../../components/ui/CardHeading";
import TextBeside from "../Common/TextBeside";
import LeadAssign from "../Common/LeadAssign";

const ProfileInfo = ({ pageData, convertData, refetch, convertRefetch }) => {
  const [modalData, setModalData] = useState();
  const [modalForProfile, setModalForProfile] = useState(false);
  const [modalForAssign, setModalForAssign] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    get(`event/ConsultantApi/details?id=${pageData?.consultantId}`).then(
      (res) => {
        console.log(res);
        setData(res);
      }
    );
  }, [pageData]);

  const consultant = data?.data;

  return (
    <>
      <div className="custom-card-border p-4 mb-3 bg-f2ecfd">
        <div className="d-flex justify-content-between">
          <CardHeading Icon={LiaUserCircle} text="Profile" />
          <EditBtn
            action={() => {
              setModalForProfile(true);
              setModalData({
                id: pageData?.id,
                name: pageData?.name,
                email: pageData?.email,
                phoneNumber: pageData?.phoneNumber,
                whatsappNumber: pageData?.whatsappNumber
                  ? pageData?.whatsappNumber
                  : pageData?.phoneNumber,
              });
            }}
          />
        </div>

        <TextBeside title="Name" text={pageData?.name} />
        <TextBeside title="Phone" text={pageData?.phoneNumber} />
        <TextBeside
          title="Whatsapp"
          text={pageData?.whatsappNumber}
          link={`https://web.whatsapp.com/send?phone=${pageData?.whatsappNumber}`}
        />

        <TextBeside
          title="Email"
          text={pageData?.email}
          link={`mailto: ${pageData?.email}`}
        />

        <TextBeside title="Date" text={pageData?.leadDate} />
        <TextBeside title="Country" text={pageData?.country} />

        {pageData?.platformLeadId && (
          <TextBeside title="Platform Id" text={pageData?.platformLeadId} />
        )}

        {!Consultant() && (
          <>
            {pageData?.assignedTo ? (
              <>
                {/* {isLoading ? (
                  <Loading />
                ) : isError ? (
                  <ErrorText error={error.message} />
                ) : ( */}
                <div
                  className={`custom-card-border p-4 mb-3 mt-16px ${
                    !convertData?.data && "mb-0"
                  }`}
                >
                  <div className="d-flex justify-content-between">
                    <CardHeading text="Consultant" className="mb-0" />
                    <div>
                      <span
                        className="gray-500 pointer"
                        onClick={() => {
                          setModalForAssign(true);
                          setModalData({
                            leadId: pageData?.id,
                            branchId: pageData?.branchId,
                            consultantId: pageData?.consultantId,
                          });
                        }}
                      >
                        Change
                      </span>
                      <EditBtn
                        action={() => {
                          setModalForAssign(true);
                          setModalData({
                            leadId: pageData?.id,
                            branchId: pageData?.branchId,
                            consultantId: pageData?.consultantId,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <p className="gray-500"> {consultant?.fullName}</p>
                  <p className="gray-500 fw-500 mb-0">
                    <MdOutlineMailOutline size={16} className="mr-4px" />
                    {consultant?.email}
                  </p>
                  <p className="gray-500 fw-500 mb-0">
                    <AiOutlinePhone size={16} className="mr-4px" />
                    {consultant?.phoneNumber}
                  </p>
                </div>
                {/* )} */}
              </>
            ) : (
              <div className="mt-16px">
                <TextBeside title="Status" text={pageData?.statusName} />
                <SaveButton
                  text="Assign Consultant"
                  action={() => {
                    setModalForAssign(true);
                    setModalData({
                      leadId: pageData?.id,
                      branchId: pageData?.branchId,
                      consultantId: pageData?.consultantId,
                    });
                  }}
                />
              </div>
            )}
          </>
        )}

        <ConvertStudent
          id={pageData?.id}
          student={pageData}
          isConvert={convertData?.data}
          refetch={() => {
            refetch();
            convertRefetch();
          }}
        />
      </div>

      <Modal
        show={modalForProfile}
        onHide={() => setModalForProfile(false)}
        centered
      >
        <Modal.Body>
          <ProfileEdit
            defaultData={modalData}
            refetch={refetch}
            action={() => setModalForProfile(false)}
          />
        </Modal.Body>
      </Modal>

      <Modal
        show={modalForAssign}
        onHide={() => setModalForAssign(false)}
        centered
      >
        <Modal.Body>
          <LeadAssign
            data={modalData}
            refetch={refetch}
            action={() => setModalForAssign(false)}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProfileInfo;
