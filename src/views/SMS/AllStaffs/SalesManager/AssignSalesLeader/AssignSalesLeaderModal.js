import React, { useEffect, useState } from "react";
import { Input, Form, FormGroup, Table, Col, Row } from "reactstrap";
import { useToasts } from "react-toast-notifications";
import Select from "react-select";
import CancelButton from "../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../components/buttons/SaveButton";
import post from "../../../../../helpers/post";
import Uget from "../../../../../helpers/Uget";
const AssignSalesLeaderModal = ({
  salesManagerId,
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
  const [entity, setEntity] = useState(0);
  const dataSizeArr = [15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    setCurrentPage(1);
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  useEffect(() => {
    Uget(
      `SalesManager/FetchUnassignedSalesTeamLeaders?employeeId=${salesManagerId}&page=${currentPage}&pageSize=${dataPerPage}&search=${searchStr}`
    ).then((res) => {
      setUnAssignSalesTeam(res?.items);
      setEntity(res?.totalFiltered);
    });
  }, [salesManagerId, success, currentPage, dataPerPage, searchStr]);

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
      EmployeeId: salesManagerId,
      SalesTeamLeaderIds: salesTeamLeaderIds,
    };
    post(`SalesManager/AssignSalesTeamLeaders`, subdata).then((res) => {
      addToast(res?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
      setModalOpen(false);
      setSuccess(!success);
    });
  };

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
      <Row>
        <Col lg="10" md="10" sm="12" xs="12">
          {" "}
          <Input
            className="mb-2 mr-4"
            style={{ height: "2.7rem" }}
            type="text"
            // name="search"
            value={searchStr}
            // id="search"
            placeholder="Search By Email"
            onChange={searchValue}
            onKeyDown={handleKeyDown}
          />
        </Col>
        <Col lg="2" md="2" sm="12" xs="12">
          {" "}
          <div className="ddzindex">
            <Select
              options={dataSizeName}
              value={{ label: dataPerPage, value: dataPerPage }}
              onChange={(opt) => selectDataSize(opt.value)}
            />
          </div>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Table>
          <thead className="tablehead">
            <td className="border-0">
              <b>Sales Team Leader</b>
            </td>
            <td className="border-0">
              <b>Email</b>
            </td>
            <td className="border-0">
              <b>Is Assigned</b>
            </td>
          </thead>
          <tbody style={{ borderBottom: "1px solid #dee2e6" }}>
            {unAssignSalesTeam?.length > 0 &&
              unAssignSalesTeam?.map((item, i) => (
                <tr key={item?.salesTeamLeaderId}>
                  <td>{item?.salesTeamLeaderName}</td>
                  <td>{item?.salesTeamLeaderEmail}</td>
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
