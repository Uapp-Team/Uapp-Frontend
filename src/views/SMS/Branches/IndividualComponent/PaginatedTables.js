import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";
import get from "../../../../helpers/get";
import Select from "react-select";
import Pagination from "../../Pagination/Pagination";
import ToggleSwitch from "../../Components/ToggleSwitch";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import remove from "../../../../helpers/remove";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import ButtonForFunction from "../../Components/ButtonForFunction";
import put from "../../../../helpers/put";
import ButtonLoader from "../../Components/ButtonLoader";

const PaginatedTables = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);

  const [currentPage2, setCurrentPage2] = useState(1);
  const [dataPerPage2, setDataPerPage2] = useState(15);

  const [currentPage3, setCurrentPage3] = useState(1);
  const [dataPerPage3, setDataPerPage3] = useState(15);

  const [currentPage4, setCurrentPage4] = useState(1);
  const [dataPerPage4, setDataPerPage4] = useState(15);

  const [currentPage5, setCurrentPage5] = useState(1);
  const [dataPerPage5, setDataPerPage5] = useState(15);

  const [currentPage6, setCurrentPage6] = useState(1);
  const [dataPerPage6, setDataPerPage6] = useState(15);

  const [accountsManager, setAccountsManager] = useState([]);
  const [editor, setEditor] = useState([]);
  const [accountsOfficer, setAccountsOfficer] = useState([]);
  const [financeManager, setFinanceManager] = useState([]);
  const [complianceManager, setComplianceManager] = useState([]);
  const [consultant, setConsultant] = useState([]);
  const [entity, setEntity] = useState(0);
  const [entity2, setEntity2] = useState(0);
  const [entity3, setEntity3] = useState(0);
  const [entity4, setEntity4] = useState(0);
  const [entity5, setEntity5] = useState(0);
  const [entity6, setEntity6] = useState(0);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [success, setSuccess] = useState(false);
  const [delData, setDelData] = useState({});
  const history = useHistory();
  const permissions = localStorage.getItem("permissions");
  const [deleteModal, setDeleteModal] = useState(false);
  const [progress, setProgress] = useState(false);
  const { addToast } = useToasts();

  const [callApi, setCallApi] = useState(false);

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  useEffect(() => {
    get(
      `BranchConsultant/Bybranch?page=${currentPage6}&pageSize=${dataPerPage6}&branchId=${props?.id}`
    ).then((res) => {
      setConsultant(res?.models);
      setEntity6(res?.totalEntity);
    });
  }, [
    dataPerPage,
    dataPerPage2,
    dataPerPage3,
    dataPerPage4,
    dataPerPage5,
    callApi,
    entity,
    entity2,
    entity3,
    entity4,
    entity5,
    success,
  ]);

  const selectDataSize = (value) => {
    setCurrentPage(1);
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  const selectDataSize2 = (value) => {
    setDataPerPage2(value);
    setCallApi((prev) => !prev);
  };

  const selectDataSize3 = (value) => {
    setDataPerPage3(value);
    setCallApi((prev) => !prev);
  };

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  const paginate2 = (pageNumber) => {
    setCurrentPage2(pageNumber);
    setCallApi((prev) => !prev);
  };

  const paginate3 = (pageNumber) => {
    setCurrentPage3(pageNumber);
    setCallApi((prev) => !prev);
  };

  const paginate4 = (pageNumber) => {
    setCurrentPage4(pageNumber);
    setCallApi((prev) => !prev);
  };

  const paginate5 = (pageNumber) => {
    setCurrentPage5(pageNumber);
    setCallApi((prev) => !prev);
  };

  const paginate6 = (pageNumber) => {
    setCurrentPage6(pageNumber);
    setCallApi((prev) => !prev);
  };

  const selectDataSize4 = (value) => {
    setDataPerPage4(value);
    setCallApi((prev) => !prev);
  };

  const selectDataSize5 = (value) => {
    setDataPerPage5(value);
    setCallApi((prev) => !prev);
  };

  const selectDataSize6 = (value) => {
    setDataPerPage6(value);
    setCallApi((prev) => !prev);
  };

  const toggleDanger = (p) => {
    setDelData(p);

    setDeleteModal(true);
  };

  const handleDeleteData = () => {
    setButtonStatus(true);
    setProgress(true);
    remove(`Consultant/Delete/${delData?.id}`).then((res) => {
      setProgress(false);
      setButtonStatus(false);
      //
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteModal(false);
      setSuccess(!success);
    });
  };

  const redirectToConsultantProfile = (consultantId) => {
    history.push(`/consultantProfile/${consultantId}`);
  };

  // Edit Consultant Information

  const handleEdit = (data) => {
    history.push(`/consultantInformation/${data?.id}`);
  };

  const handleUpdate = (data) => {
    put(`Consultant/UpdateAccountStatus/${data?.id}`).then((res) => {
      if (res?.status == 200 && res?.data?.isSuccess == true) {
        addToast(res?.data?.message, {
          autoDismiss: true,
          appearance: "success",
        });
        setSuccess(!success);
      } else {
        addToast(res?.data?.message, {
          autoDismiss: true,
          appearance: "error",
        });
      }
    });
  };

  return (
    <div>
      {/* Consultant List */}
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <div className="hedding-titel">
              <h5>
                {" "}
                <b>Consultant List</b>{" "}
              </h5>

              <div className="bg-h"></div>
            </div>

            <div className="d-flex">
              <div className="mr-2 mt-2">Showing :</div>
              <div>
                <Select
                  options={dataSizeName}
                  value={{ label: dataPerPage6, value: dataPerPage6 }}
                  onChange={(opt) => selectDataSize6(opt.value)}
                />
              </div>
            </div>
          </div>

          <div className="table-responsive my-3">
            <Table id="table-to-xls" className="table-sm table-bordered">
              <thead className="thead-uapp-bg">
                <tr style={{ textAlign: "center" }}>
                  {/* <th>SL/NO</th> */}
                  <th>UAPP ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Total Students</th>
                  <th>Total Applications</th>
                  <th>Registered Students</th>
                  {permissions?.includes(
                    permissionList?.Change_Status_Consultant
                  ) ? (
                    <th>Status</th>
                  ) : null}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {consultant?.map((con, i) => (
                  <tr key={i} style={{ textAlign: "center" }}>
                    {/* <th scope="row">{1 + i}</th> */}
                    <td>{con?.viewId}</td>
                    <td>
                      {con?.firstName} {con.lastName}
                    </td>
                    <td>{con?.email}</td>
                    <td>
                      <span
                        // onClick={() => redirectToAdmissionOfficerList(manager?.providerId, manager?.id)}
                        className="badge badge-secondary"
                        // style={{ cursor: "pointer" }}
                      >
                        {con?.totalStudent}
                      </span>
                    </td>
                    <td>
                      <span
                        // onClick={() => redirectToAdmissionOfficerList(manager?.providerId, manager?.id)}
                        className="badge badge-secondary"
                        // style={{ cursor: "pointer" }}
                      >
                        {con?.totalApplication}
                      </span>
                    </td>
                    <td>
                      <span
                        // onClick={() => redirectToAdmissionOfficerList(manager?.providerId, manager?.id)}
                        className="badge badge-secondary"
                        // style={{ cursor: "pointer" }}
                      >
                        {con?.registeredStudent}
                      </span>
                    </td>
                    {permissions?.includes(
                      permissionList?.Change_Status_Consultant
                    ) ? (
                      <td>
                        <ToggleSwitch
                          defaultChecked={con?.isActive}
                          onChange={() => handleUpdate(con)}
                        />
                      </td>
                    ) : null}
                    <td>
                      <ButtonGroup variant="text">
                        {/* <LinkButton
                            url={`/consultantProfile/${consultant?.id}`}
                            color={"primary"}
                            className={"mx-1 btn-sm"}
                            icon={<i className="fas fa-eye"></i>}
                         
                          /> */}

                        {permissions?.includes(
                          permissionList.View_Consultant
                        ) ? (
                          <ButtonForFunction
                            func={() => redirectToConsultantProfile(con?.id)}
                            color={"primary"}
                            className={"mx-1 btn-sm"}
                            icon={<i className="fas fa-eye"></i>}
                          />
                        ) : null}

                        {con?.id !== 1 ? (
                          <>
                            {permissions?.includes(
                              permissionList.Edit_Consultant
                            ) ? (
                              <ButtonForFunction
                                func={() => handleEdit(con)}
                                color={"warning"}
                                className={"mx-1 btn-sm"}
                                icon={<i className="fas fa-edit"></i>}
                              />
                            ) : null}

                            {permissions?.includes(
                              permissionList.Delete_Consultant
                            ) ? (
                              <ButtonForFunction
                                color={"danger"}
                                className={"mx-1 btn-sm"}
                                func={() => toggleDanger(con)}
                                icon={<i className="fas fa-trash-alt"></i>}
                              />
                            ) : null}
                          </>
                        ) : // <Button color="danger" className="mx-1 btn-sm" disabled><i className="fas fa-trash-alt"></i></Button>
                        null}
                      </ButtonGroup>
                      <Modal
                        isOpen={deleteModal}
                        toggle={() => setDeleteModal(!deleteModal)}
                        className="uapp-modal"
                      >
                        <ModalBody>
                          <p>
                            Are You Sure to Delete this ? Once Deleted it can't
                            be Undone!
                          </p>
                        </ModalBody>

                        <ModalFooter>
                          <Button
                            color="danger"
                            onClick={handleDeleteData}
                            disabled={buttonStatus}
                          >
                            {progress ? <ButtonLoader /> : "YES"}
                          </Button>
                          <Button onClick={() => setDeleteModal(false)}>
                            NO
                          </Button>
                        </ModalFooter>
                      </Modal>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <Pagination
            dataPerPage={dataPerPage6}
            totalData={entity6}
            paginate={paginate6}
            currentPage={currentPage6}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default PaginatedTables;
