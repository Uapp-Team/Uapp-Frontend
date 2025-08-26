import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
} from "reactstrap";
import ReactTableConvertToXl from "../../../ReactTableConvertToXl/ReactTableConvertToXl";
import ReactToPrint from "react-to-print";
import { useToasts } from "react-toast-notifications";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom";
import get from "../../../../../helpers/get";
import remove from "../../../../../helpers/remove";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import ButtonForFunction from "../../../Components/ButtonForFunction";
import { userTypes } from "../../../../../constants/userTypeConstant";
import AssignSalesLeaderModal from "./AssignSalesLeaderModal";
import ConfirmModal from "../../../../../components/modal/ConfirmModal";
import Uget from "../../../../../helpers/Uget";
import Pagination from "../../../Pagination/Pagination";
import Typing from "../../../../../components/form/Typing";
import Select from "react-select";

const Index = () => {
  // const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const [assignSalesTeam, setAssignSalesTeam] = useState([]);
  const [success, setSuccess] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [salesLeaderName, setSalesLeaderName] = useState("");
  const [salesLeaderId, setSalesLeaderId] = useState(0);

  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [progress1, setProgress1] = useState(false);
  const { salesManagerId, branchId } = useParams();
  const { addToast } = useToasts();
  const location = useLocation();
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [data, setData] = useState({});
  const componentRef = useRef();
  const userType = localStorage.getItem("userType");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [searchStr, setSearchStr] = useState("");
  const [loading, setLoading] = useState(true);
  const [entity, setEntity] = useState(0);
  const [serialNum, setSerialNum] = useState(1);
  const [callApi, setCallApi] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const dataSizeArr = [15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    setCurrentPage(1);
    setLoading(true);
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  //  change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  // on enter press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
      setCallApi((prev) => !prev);
    }
  };

  useEffect(() => {
    if (!isTyping) {
      Uget(
        `SalesManager/FetchAssignedSalesTeamLeaders?employeeId=${salesManagerId}&page=${currentPage}&pageSize=${dataPerPage}&searchText=${searchStr}`
      ).then((res) => {
        console.log(res);

        setAssignSalesTeam(res?.items);
        setEntity(res?.totalFiltered);
        setSerialNum(res?.from);
        setLoading(false);
      });
    }
  }, [salesManagerId, currentPage, dataPerPage, searchStr, success, isTyping]);

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
  };

  const toggleDanger = (p) => {
    setSalesLeaderId(p?.salesTeamLeaderId);
    setSalesLeaderName(p?.salesTeamLeaderName);
    setDeleteModal(true);
  };

  const handleDeletePermission = (salesLeaderId) => {
    setButtonStatus1(true);
    setProgress1(true);

    remove(
      `SalesManager/UnassignSalesTeamLeaders?salesmanagerId=${salesManagerId}&salesteamleaderId=${salesLeaderId}`
    ).then((action) => {
      setButtonStatus1(false);
      setProgress1(false);
      setDeleteModal(false);
      setSuccess(!success);
      addToast(action, {
        appearance: "error",
        autoDismiss: true,
      });
      setSalesLeaderId(0);
      setSalesLeaderName("");
    });
  };

  return (
    <div>
      <BreadCrumb
        title="Assigned Sales Team Leader"
        backTo={
          userType === userTypes?.SalesTeamLeader ? null : "Sales Manager"
        }
        path={`/salesManagerList`}
      />

      <Card className="uapp-employee-search">
        <CardBody>
          <Row className="mb-3">
            <Col lg="5" md="5" sm="12" xs="12">
              <div className="d-sm-flex">
                <ButtonForFunction
                  func={() => setModalOpen(true)}
                  className={"btn btn-uapp-add mr-2 "}
                  icon={<i className="fas fa-plus"></i>}
                  name={" Assign Sales Team Leader"}
                  permission={6}
                />
              </div>
            </Col>
            <Col lg="7" md="7" sm="12" xs="12" className="mt-md-0 mt-sm-3">
              <div className="d-flex justify-content-md-end justify-content-sm-start">
                <div className="mr-3">
                  <div className="d-flex align-items-center">
                    <div className="mr-2">
                      {" "}
                      <Typing
                        name="search"
                        id="search"
                        placeholder="Name, Email"
                        value={searchStr}
                        setValue={setSearchStr}
                        setIsTyping={setIsTyping}
                        onKeyDown={handleKeyDown}
                      />
                    </div>
                    <div className="mr-2">Showing :</div>
                    <div className="ddzindex">
                      <Select
                        options={dataSizeName}
                        value={{ label: dataPerPage, value: dataPerPage }}
                        onChange={(opt) => selectDataSize(opt.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <div>
            <Modal
              isOpen={modalOpen}
              toggle={closeModal}
              className="uapp-modal2"
              size="lg"
            >
              <ModalHeader>
                <span>Unassign Sales Team Leader</span>
              </ModalHeader>
              <ModalBody>
                <AssignSalesLeaderModal
                  salesManagerId={salesManagerId}
                  setModalOpen={setModalOpen}
                  success={success}
                  setSuccess={setSuccess}
                />
              </ModalBody>
            </Modal>
          </div>
          
          <div className="table-responsive fixedhead" ref={componentRef}>
            <Table id="table-to-xls" className="table-sm table-bordered">
              <thead className="thead-uapp-bg">
                <tr style={{ textAlign: "center" }}>
                  <th>SL/NO</th>
                  <th>Sales Team Leader</th>
                  <th>Email</th>
                  <th style={{ width: "8%" }} className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {assignSalesTeam?.map((salesTeam, i) => (
                  <tr
                    key={salesTeam?.salesTeamLeaderId}
                    style={{ textAlign: "center" }}
                  >
                    <td>{i + 1}</td>

                    <td>{salesTeam?.salesTeamLeaderName}</td>
                    <td>{salesTeam?.salesTeamLeaderEmail}</td>

                    <td style={{ width: "8%" }} className="text-center">
                      <ButtonGroup variant="text">
                        <ButtonForFunction
                          color={"danger"}
                          func={() => toggleDanger(salesTeam)}
                          className={"mx-1 btn-sm"}
                          icon={<i className="fas fa-trash-alt"></i>}
                          permission={6}
                        />
                      </ButtonGroup>
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

      <ConfirmModal
        text={`Do You Want To Delete This ${salesLeaderName} Information ?`}
        isOpen={deleteModal}
        toggle={closeModal}
        confirm={() => handleDeletePermission(salesLeaderId)}
        cancel={() => {
          setDeleteModal(false);
          setSalesLeaderId(0);
          setSalesLeaderName("");
        }}
        buttonStatus={buttonStatus1}
        progress={progress1}
      />
    </div>
  );
};

export default Index;
