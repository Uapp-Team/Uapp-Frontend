import React, { useEffect, useState } from "react";
import { Input, Form, FormGroup, Table, Col, Row } from "reactstrap";
import { useToasts } from "react-toast-notifications";
import Select from "react-select";
import SaveButton from "../../../../components/buttons/SaveButton";
import CancelButton from "../../../../components/buttons/CancelButton";
import Uget from "../../../../helpers/Uget";
import { post } from "../../../ReusableFunction/Api/ApiFunc";
import axios from "axios";
import put from "../../../../helpers/put";
const AssignBranchConsultantModal = ({
  branchId,
  setModalOpen,
  success,
  setSuccess,
}) => {
  const { addToast } = useToasts();
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [callApi, setCallApi] = useState(false);
  const [entity, setEntity] = useState(0);
  const [consultantList, setConsultantList] = useState([{ label: "", value: "" }]);

  useEffect(() => {
    Uget(
      `ConsultantDD/ByBranch/${branchId}`
    ).then((res) => {
      const mapped = res?.result?.map((r) => ({
        label: r.name,
        value: r.id,
        }));
      setConsultantList((prev) => [...prev, ...mapped]);
    });
  }, [branchId]);


  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    put(`Branch/AssignDefaultConsultant?branchId=${branchId}&consultantId=${selectedConsultant.value}`).then((res)=>{
       addToast(res?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
      setModalOpen(false);
      setSuccess(true);
    });

    // post(`SalesManager/AssignSalesTeamLeadersByQuery`, subdata).then((res) => {
    //   addToast(res?.data?.message, {
    //     appearance: "success",
    //     autoDismiss: true,
    //   });
    //   setModalOpen(false);
    //   setSuccess(!success);
    // });
  };

//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//       setCurrentPage(1);
//       setCallApi((prev) => !prev);
//     }
//   };

  return (
    <>
      <Row>
        <Col lg="6" md="6" sm="12" xs="12">
         {" "}
         <span>
            Consultants
         </span>
          <div className="ddzindex">
            <Select
              options={consultantList}
              value={selectedConsultant}
              onChange={setSelectedConsultant}
            />
          </div>
        </Col>
      </Row>
      <br></br>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <CancelButton cancel={closeModal} />
          <SaveButton
            text="Assign"
            progress={progress}
            buttonStatus={buttonStatus}
          />
        </FormGroup>
      </Form>
    </>
  );
};

export default AssignBranchConsultantModal;
