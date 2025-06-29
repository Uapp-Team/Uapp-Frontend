import React, { useEffect, useState } from "react";
import { Input, Form, FormGroup, Table } from "reactstrap";
import { useToasts } from "react-toast-notifications";
import Select from "react-select";
import CancelButton from "../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../components/buttons/SaveButton";
import post from "../../../../../helpers/post";
import Uget from "../../../../../helpers/Uget";
const AssignSalesLeaderModal = ({
  salesTeamLeaderId,
  setModalOpen,
  success,
  setSuccess,
}) => {
  const { addToast } = useToasts();
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [unAssignSalesTeam, setUnAssignSalesTeam] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [callApi, setCallApi] = useState(false);
  const [dataPerPage, setDataPerPage] = useState(15);

  useEffect(() => {
    Uget(
      `SalesTeamLeader/FetchUnassignedConsultants?employeeId=${salesTeamLeaderId}&page=${currentPage}&pageSize=${dataPerPage}&search=${searchStr}`
    ).then((res) => {
      setUnAssignSalesTeam(res?.data);
    });
  }, [salesTeamLeaderId, success, currentPage, dataPerPage, searchStr]);

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const salesTeamLeaderIds = unAssignSalesTeam
      .filter((c) => c.isAssign)
      .map((c) => c.salesTeamLeaderId);

    const subdata = {
      EmployeeId: salesTeamLeaderId,
      SalesTeamLeaderIds: salesTeamLeaderIds,
    };
    post(`SalesTeamLeader/FetchAssignedConsultants`, subdata).then((res) => {
      addToast(res?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
      setModalOpen(false);
      setSuccess(!success);
    });
  };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     setButtonStatus(true);
  //     setProgress(true);
  //     post(`AdmissionManagerUniversity/AssignUniversities`, assign).then(
  //       (res) => {
  //         setButtonStatus(false);
  //         setProgress(false);
  //         if (res?.status === 200 && res?.data?.isSuccess === true) {
  //           addToast(res?.data?.message, {
  //             appearance: "success",
  //             autoDismiss: true,
  //           });
  //           setModalOpen(false);
  //           setSuccess(!success);
  //         } else {
  //           addToast(res?.data?.message, {
  //             appearance: "error",
  //             autoDismiss: true,
  //           });
  //         }
  //       }
  //     );
  //   };

  const HandleAddOrRemove = (e, id) => {
    const values = [...unAssignSalesTeam];
    values[id].isAssign = e.target.checked;
    console.log(values, "values of assign");

    setUnAssignSalesTeam(values);
    console.log("pki poki", unAssignSalesTeam);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setCallApi((prev) => !prev);
  };

  const searchValue = (e) => {
    setSearchStr(e.target.value);
    handleSearch();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
      setCallApi((prev) => !prev);
    }
  };

  return (
    <>
      <Input
        className="mb-2"
        style={{ height: "2.7rem" }}
        type="text"
        // name="search"
        value={searchStr}
        // id="search"
        placeholder="Search By Email"
        onChange={searchValue}
        onKeyDown={handleKeyDown}
      />
      <Form onSubmit={handleSubmit}>
        <Table>
          <thead className="tablehead">
            <td className="border-0">
              <b>Consultant</b>
            </td>
            <td className="border-0">
              <b>Email</b>
            </td>
            <td className="border-0">
              <b>Is Assigned</b>
            </td>
          </thead>
          <tbody style={{ borderBottom: "1px solid #dee2e6" }}>
            {unAssignSalesTeam.length > 0 &&
              unAssignSalesTeam?.map((item, i) => (
                <tr key={item?.consultantId}>
                  <td>{item?.consultantName}</td>
                  <td>{item?.consultantEmail}</td>
                  <td>
                    <input
                      // className="form-check-input"
                      type="checkbox"
                      onChange={(e) => {
                        HandleAddOrRemove(e, i);
                      }}
                      value={item?.isAssign}
                      defaultChecked={item?.isAssign === true ? true : false}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <FormGroup>
          <CancelButton cancel={closeModal} />
          <SaveButton
            text="Submit"
            progress={progress}
            buttonStatus={buttonStatus}
          />
        </FormGroup>
      </Form>
    </>
  );
};

export default AssignSalesLeaderModal;
