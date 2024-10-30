import React, { useEffect, useState } from "react";
import get from "../../../../helpers/get";
import Pagination from "../../Pagination/Pagination";
import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";
import Select from "react-select";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import ButtonForFunction from "../../Components/ButtonForFunction";
import LinkButton from "../../Components/LinkButton";
import { useHistory } from "react-router-dom";
import ButtonLoader from "../../Components/ButtonLoader";
import remove from "../../../../helpers/remove";
import { useToasts } from "react-toast-notifications";

const ApplicationListForBranch = ({ id }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [applications, setApplications] = useState([]);
  const [entity, setEntity] = useState(0);
  const [callApi, setCallApi] = useState(false);
  const [success, setSuccess] = useState(false);
  const [delData, setDelData] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [progress, setProgress] = useState(false);

  const permissions = localStorage.getItem("permissions");

  const { addToast } = useToasts();
  const history = useHistory();

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    setCurrentPage(1);
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  useEffect(() => {
    get(
      `Branch/Applicationlist?page=${currentPage}&pagesize=${dataPerPage}&id=${id}`
    ).then((res) => {
      setApplications(res?.models);
      setEntity(res?.totalEntity);
    });
  }, [currentPage, dataPerPage, callApi, success]);

  const toggleDanger = (data) => {
    setDelData(data);
    setDeleteModal(true);
  };

  const handleDeleteData = () => {
    setProgress(true);
    remove(`Application/Delete/${delData?.id}`).then((res) => {
      setProgress(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setSuccess(!success);
      setDeleteModal(false);
      setDelData({});
    });
  };

  return (
    <div>
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between">
            <div className="hedding-titel">
              <h5>
                {" "}
                <b>Application List</b>{" "}
              </h5>

              <div className="bg-h"></div>
            </div>

            <div className="d-flex">
              <div className="mr-2 mt-2">Showing :</div>
              <div>
                <Select
                  options={dataSizeName}
                  value={{ label: dataPerPage, value: dataPerPage }}
                  onChange={(opt) => selectDataSize(opt.value)}
                />
              </div>
            </div>
          </div>

          <div className="table-responsive my-3">
            <Table
              id="table-to-xls"
              style={{ verticalAlign: "middle" }}
              className="table-sm table-bordered"
            >
              <thead className="thead-uapp-bg">
                <tr style={{ textAlign: "center" }}>
                  <th style={{ verticalAlign: "middle" }}>APP ID</th>

                  <th style={{ verticalAlign: "middle" }}>UAPP ID</th>

                  <th style={{ verticalAlign: "middle" }}>Applicant</th>

                  <th style={{ verticalAlign: "middle" }}>Contact</th>

                  <th style={{ verticalAlign: "middle" }}>University</th>

                  <th style={{ verticalAlign: "middle" }}>Campus</th>

                  <th style={{ verticalAlign: "middle" }}>Course</th>

                  <th style={{ verticalAlign: "middle" }}>Intake</th>

                  <th style={{ verticalAlign: "middle" }}>Application Date</th>

                  <th style={{ verticalAlign: "middle" }}>Status</th>

                  <th style={{ verticalAlign: "middle" }}>Offer</th>

                  <th style={{ verticalAlign: "middle" }}>Interview</th>

                  <th style={{ verticalAlign: "middle" }}>ELPT</th>

                  <th style={{ verticalAlign: "middle" }}>Enrolment Status</th>

                  <th style={{ verticalAlign: "middle" }}>SLCs</th>

                  <th style={{ verticalAlign: "middle" }}>Consultant</th>

                  <th
                    style={{ verticalAlign: "middle" }}
                    className="text-center"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {applications?.map((app, i) => (
                  <tr key={i}>
                    <td style={{ verticalAlign: "middle" }}>
                      {app?.applicationViewId}
                    </td>

                    <td
                      style={{ verticalAlign: "middle" }}
                      className="cursor-pointer hyperlink-hover"
                    >
                      <span
                        onClick={() => {
                          history.push(`/studentProfile/${app?.studentId}`);
                        }}
                      >
                        {app?.uappId}
                      </span>
                    </td>

                    <td
                      style={{ verticalAlign: "middle" }}
                      className="cursor-pointer hyperlink-hover"
                    >
                      <span
                        onClick={() => {
                          history.push(
                            `/applicationDetails/${app?.id}/${app?.studentId}`
                          );
                        }}
                      >
                        {app?.studentName}
                      </span>
                    </td>

                    <td style={{ verticalAlign: "middle" }}>
                      {app?.studentPhone} <br />
                      {app?.studentEmail}
                    </td>

                    <td style={{ verticalAlign: "middle" }}>
                      <span>{app?.universityName}</span>
                    </td>

                    <td style={{ verticalAlign: "middle" }}>
                      {app?.campusName}
                    </td>

                    <td style={{ verticalAlign: "middle" }}>
                      {app?.subjectName}
                    </td>

                    <td style={{ verticalAlign: "middle" }}>
                      {app?.intakeName}
                    </td>

                    <td style={{ verticalAlign: "middle" }}>
                      {app?.applicationDate ? (
                        <>{/* {handleDate(app?.applicationDate)} */}</>
                      ) : null}
                    </td>

                    <td style={{ verticalAlign: "middle" }}>
                      {app?.applicationStatusName}
                    </td>

                    <td style={{ verticalAlign: "middle" }}>
                      {app?.offerStatusName}
                    </td>

                    <td style={{ verticalAlign: "middle" }}>
                      {app?.interviewStatusName}
                    </td>

                    <td style={{ verticalAlign: "middle" }}>
                      {app?.elptStatusName}
                    </td>

                    <td style={{ verticalAlign: "middle" }}>
                      {app?.enrollmentStatusName}
                    </td>

                    <td style={{ verticalAlign: "middle" }}>
                      {app?.studentFinanceName}
                    </td>

                    <td style={{ verticalAlign: "middle" }}>
                      {app?.consultantName}
                    </td>

                    <td style={{ width: "8%" }} className="text-center">
                      <div className="d-flex">
                        {permissions?.includes(
                          permissionList.View_Application_Details
                        ) ? (
                          <LinkButton
                            url={`/applicationDetails/${app?.id}/${app?.studentId}`}
                            color="primary"
                            className={"mx-1 btn-sm mt-2"}
                            icon={<i className="fas fa-eye"></i>}
                          />
                        ) : null}

                        {permissions.includes(
                          permissionList.Delete_Application_Details
                        ) ? (
                          <ButtonForFunction
                            icon={
                              <i
                                className="fas fa-trash-alt"
                                style={{
                                  paddingLeft: "1.8px",
                                  paddingRight: "1.8px",
                                }}
                              ></i>
                            }
                            color={"danger"}
                            className={"mx-1 btn-sm mt-2"}
                            func={() => toggleDanger(app)}
                          />
                        ) : null}
                      </div>
                      {/* </ButtonGroup> */}

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
                          <Button color="danger" onClick={handleDeleteData}>
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
            dataPerPage={dataPerPage}
            totalData={entity}
            paginate={paginate}
            currentPage={currentPage}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default ApplicationListForBranch;
