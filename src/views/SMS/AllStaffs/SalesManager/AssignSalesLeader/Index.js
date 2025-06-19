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

  useEffect(() => {
    Uget(
      `SalesManager/FetchAssignedSalesTeamLeaders?employeeId=${salesManagerId}`
    ).then((res) => {
      setAssignSalesTeam(res?.data);
    });
  }, [salesManagerId, success]);

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
            <Col lg="6" md="6" sm="12" xs="12">
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

          {/* {loading ? (
            <h2 className="text-center">Loading...</h2>
          ) : ( */}
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
          {/* )} */}
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
