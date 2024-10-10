import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

import put from "../../../helpers/put";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  Row,
  InputGroup,
  Table,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  ButtonGroup,
} from "reactstrap";
import Select from "react-select";
import { rootUrl } from "../../../constants/constants";
import get from "../../../helpers/get";
import post from "../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import remove from "../../../helpers/remove";
import ButtonForFunction from "../Components/ButtonForFunction";
import { userTypes } from "../../../constants/userTypeConstant";
import CustomButtonRipple from "../Components/CustomButtonRipple";
import PromotionalCommission from "./PromotionalCommission";
import ButtonLoader from "../Components/ButtonLoader";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import { dateFormate } from "../../../components/date/calenderFormate";

const UpdateAssociateCommission = () => {
  const history = useHistory();
  const [activetab, setActivetab] = useState("3");

  const [commissionGroupList, setCommissionGrouplist] = useState([]);
  const [commissionDD, setCommissionDD] = useState([]);
  const [commissionLabel, setCommissionLabel] = useState("Select Commission");
  const [commissionValue, setCommissionValue] = useState(0);
  const [commissionError, setCommissionError] = useState(false);

  const [priceRangeList, setPriceRangeList] = useState([]);

  const [delCommissionName, setDelCommissionName] = useState("");
  const [delCommissionId, setDelCommissionId] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);

  const [commissionName, setCommissionName] = useState("");
  const [commissionId, setCommissionId] = useState(0);
  const [reAssignModal, setReAssignModal] = useState(false);

  const [promotionalList, setPromotionalList] = useState([]);

  const [showForm, setShowForm] = useState(true);
  const [checked, setChecked] = useState(false);
  const { addToast } = useToasts();
  const [success, setSuccess] = useState(false);
  const { consultantRegisterId } = useParams();
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  const userTypeId = localStorage.getItem("userType");

  const front = () => {
    history.push(`/associateConsent/${consultantRegisterId}`);
  };

  const back = () => {
    history.push(`/associateBankDetails/${consultantRegisterId}`);
  };

  useEffect(() => {
    get("CommissionGroupDD/Index").then((res) => {
      setCommissionDD(res);
    });

    get(`ConsultantCommissionGroup/Index/${consultantRegisterId}`).then(
      (res) => {
        setCommissionGrouplist(res);
      }
    );

    get(`GroupPriceRange/ByConsultant/${consultantRegisterId}`).then((res) => {
      setPriceRangeList(res);
    });

    get(`PromotionalCommission/ForConsultant/${consultantRegisterId}`).then(
      (res) => {
        setPromotionalList(res);
      }
    );
  }, [consultantRegisterId, success]);

  const commissionMenu = commissionDD.map((commission) => ({
    label: commission?.name,
    value: commission?.id,
  }));

  const selectCommission = (label, value) => {
    setCommissionLabel(label);
    setCommissionValue(value);
    setCommissionError(false);
  };

  const toggle = (tab) => {
    setActivetab(tab);
    if (tab == "1") {
      history.push(`/associateInformation/${consultantRegisterId}`);
    }

    if (tab == "2") {
      history.push(`/associateBankDetails/${consultantRegisterId}`);
    }

    if (tab == "3") {
      history.push(`/associateCommission/${consultantRegisterId}`);
    }

    if (tab == "4") {
      history.push(`/associateConsent/${consultantRegisterId}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subdata = new FormData(e.target);
    subdata.append(`isApplicable`, checked);

    for (var i of subdata) {
    }

    if (commissionValue === 0) {
      setCommissionError(true);
    } else {
      setButtonStatus(true);
      setProgress(true);
      post("ConsultantCommissionGroup/Create", subdata).then((res) => {
        setProgress(false);
        setButtonStatus(false);
        if (res?.status === 200 && res?.data?.isSuccess == true) {
          addToast(res.data.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setShowForm(true);
          setCommissionLabel("Select Commission");
          setCommissionValue(0);
          setChecked(false);
        }
        if (res?.status === 200 && res?.data?.isSuccess == false) {
          addToast(res.data.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  const backToConsultantList = () => {
    history.push("/associateList");
  };

  const toggleDanger = (commission) => {
    setDelCommissionName(commission?.commissionGroup?.name);
    setDelCommissionId(commission?.id);
    setDeleteModal(true);
  };

  // on Close Delete Modal
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setDelCommissionName("");
    setDelCommissionId(0);
  };

  const handleDeleteCommission = (id) => {
    setButtonStatus(true);
    setProgress(true);
    const returnValue = remove(`ConsultantCommissionGroup/Delete/${id}`).then(
      (action) => {
        setProgress(false);
        setButtonStatus(false);
        setDeleteModal(false);
        setSuccess(!success);
        //
        addToast(action, {
          appearance: "error",
          autoDismiss: true,
        });
        setDelCommissionName("");
        setDelCommissionId(0);
      }
    );
  };

  const handleReAssign = (commission) => {
    setCommissionId(commission?.id);
    setCommissionName(commission?.commissionGroup?.name);
    setReAssignModal(true);
  };

  // on Close Re-assign Modal
  const closeReAssignModal = () => {
    setReAssignModal(false);
    setCommissionId(0);
    setCommissionName("");
  };

  const handleReAssignSubmit = (id) => {
    const subdata = {
      id: id,
    };
    setProgress(true);
    setButtonStatus(true);
    put(`ConsultantCommissionGroup/ReAssign/${id}`, subdata).then((res) => {
      setProgress(false);
      setButtonStatus(false);
      if (res?.status === 200 && res?.data?.isSuccess == true) {
        addToast(res.data.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setSuccess(!success);
        setReAssignModal(false);
      }
      if (res?.status === 200 && res?.data?.isSuccess == false) {
        addToast(res.data.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  return (
    <div>
      <BreadCrumb
        title="Associate Commission"
        backTo="Associates"
        path={`/associateList`}
      />

      <Card>
        <CardBody>
          {/* nav tabs start */}

          <Nav tabs>
            <NavItem>
              <NavLink active={activetab === "1"} onClick={() => toggle("1")}>
                Information
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "2"} onClick={() => toggle("2")}>
                Bank Details
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "3"} onClick={() => toggle("3")}>
                Commission
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink active={activetab === "4"} onClick={() => toggle("4")}>
                Conscent
              </NavLink>
            </NavItem>
          </Nav>

          {/* nav tabs end */}

          {/* {showForm && priceRangeList?.length > 0 ? ( */}
          {showForm ? (
            <>
              {priceRangeList?.length > 0 ? (
                <div className="row mt-4 mx-1">
                  <div className="col-md-8 col-sm-12 customCard">
                    <span className="ms-3">
                      <b>
                        Current Commission Group :{" "}
                        {priceRangeList[0]?.commissionGroup?.name}
                      </b>
                    </span>
                    <div className="table-responsive container mt-2">
                      <Table id="table-to-xls" hover>
                        <thead className="tablehead">
                          <tr style={{ textAlign: "center" }}>
                            <th>#</th>
                            <th>Price Range</th>
                            <th>Range From</th>
                            <th>Range To</th>
                            <th>Commission Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {priceRangeList?.map((range, i) => (
                            <tr key={range.id} style={{ textAlign: "center" }}>
                              <th scope="row">{1 + i}</th>

                              <td>{range?.priceRangeName}</td>

                              <td>{range?.rangeFrom}</td>

                              <td>{range?.rangeTo}</td>

                              <td>{range?.commissionAmount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12">
                    <div className=" d-flex justify-content-center mt-4">
                      <h5 className="">
                        Do you want to change this <br /> commission structure?
                      </h5>
                    </div>

                    <div className="d-flex justify-content-center">
                      <ButtonForFunction
                        func={() => setShowForm(!showForm)}
                        color={"primary"}
                        className={"mr-1 mt-3"}
                        name={"Assign New"}
                        permission={6}
                      />
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          ) : null}

          {/* { !showForm ? ( */}
          {priceRangeList?.length < 1 || !showForm ? (
            <Form onSubmit={handleSubmit} className="mt-5">
              <input
                type="hidden"
                name="consultantId"
                id="consultantId"
                value={consultantRegisterId}
              />

              <FormGroup row className="has-icon-left position-relative">
                <>
                  <Col md="4">
                    <span>
                      Assign Commission (This commission group will be default
                      commission group and all existings will be disabled){" "}
                      <span className="text-danger">*</span>{" "}
                    </span>
                  </Col>

                  <Col md="4">
                    <Select
                      options={commissionMenu}
                      value={{ label: commissionLabel, value: commissionValue }}
                      onChange={(opt) => selectCommission(opt.label, opt.value)}
                      name="commissionGroupId"
                      id="commissionGroupId"
                    />

                    {commissionError && (
                      <span className="text-danger">
                        Commission group is required
                      </span>
                    )}
                  </Col>
                </>
              </FormGroup>

              <FormGroup row className="has-icon-left position-relative">
                <>
                  <Col md="4">
                    <span>Applies for all applications</span>
                  </Col>

                  <Col md="4">
                    <label className="switch">
                      <input
                        type="checkbox"
                        defaultChecked={checked}
                        onChange={(e) => setChecked(e.target.checked)}
                      />
                      <span className="slider round"></span>
                    </label>
                  </Col>
                </>
              </FormGroup>

              <FormGroup row className="has-icon-left position-relative">
                <Col md="12">
                  <div className="text-danger">
                    Note : If a new commission group is applied to all
                    applications, the commission amount will be changed and it
                    cannot be reverted.
                  </div>
                </Col>
              </FormGroup>

              <FormGroup
                className="has-icon-left position-relative mt-5"
                style={{ display: "flex", justifyContent: "center" }}
              >
                {priceRangeList.length < 1 ? null : (
                  <Button
                    color="danger"
                    className="mx-1 mt-3"
                    onClick={() => {
                      setShowForm(!showForm);
                      setCommissionLabel("Select Commission");
                      setCommissionValue(0);
                      setChecked(false);
                    }}
                  >
                    Cancel
                  </Button>
                )}

                <CustomButtonRipple
                  color={"primary"}
                  type={"submit"}
                  className={"mx-1 mt-3"}
                  name={progress ? <ButtonLoader /> : "Submit"}
                  permission={6}
                  isDisabled={buttonStatus}
                />
              </FormGroup>
            </Form>
          ) : null}

          {commissionGroupList?.length > 0 ? (
            <div className="mt-5 customCard mx-1">
              <div className="hedding-titel d-flex justify-content-between ms-2 mb-4">
                <div>
                  <h5>
                    {" "}
                    <b>Consultant Commission Group History</b>{" "}
                  </h5>

                  <div className="bg-h"></div>
                </div>
              </div>
              <span className="ms-3">
                <b>Assigned Commission Groups</b>
              </span>
              <div className="table-responsive container mt-3">
                <Table id="table-to-xls" hover>
                  <thead className="tablehead">
                    <tr style={{ textAlign: "center" }}>
                      <th>#</th>
                      <th>Name</th>
                      <th>Applications</th>
                      <th>Status</th>
                      <th>Date Range</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commissionGroupList?.map((commission, i) => (
                      <tr key={commission?.id} style={{ textAlign: "center" }}>
                        <th scope="row">{1 + i}</th>
                        <td>{commission?.commissionGroup?.name}</td>

                        <td>{commission?.applicationCount}</td>

                        <td>
                          {commission?.isActive == false
                            ? "Deactivated"
                            : "Active"}
                        </td>

                        <td>
                          {dateFormate(commission?.createdOn)}
                          {" to "}
                          {dateFormate(commission?.updatedOn)}
                        </td>

                        <td style={{ width: "20%" }} className="text-center">
                          <ButtonGroup variant="text">
                            <ButtonForFunction
                              func={() => handleReAssign(commission)}
                              color={"primary"}
                              className={"mx-1 btn-sm"}
                              name={"Re-Assign"}
                              permission={6}
                            />

                            <ButtonForFunction
                              func={() => toggleDanger(commission)}
                              color={"danger"}
                              className={"mx-1 btn-sm"}
                              name={"Delete"}
                              permission={6}
                            />

                            {/* delete modal */}

                            <Modal
                              isOpen={deleteModal}
                              toggle={closeDeleteModal}
                              className="uapp-modal"
                            >
                              <ModalBody>
                                <p>
                                  Are you sure to delete this{" "}
                                  <b>{delCommissionName}</b> ? Once deleted it
                                  can't be undone!
                                </p>
                              </ModalBody>

                              <ModalFooter>
                                <Button
                                  color="danger"
                                  onClick={() =>
                                    handleDeleteCommission(delCommissionId)
                                  }
                                  disabled={buttonStatus}
                                >
                                  YES
                                </Button>
                                <Button
                                  color="primary"
                                  onClick={closeDeleteModal}
                                >
                                  NO
                                </Button>
                              </ModalFooter>
                            </Modal>

                            {/* Re Assign modal */}
                            <Modal
                              isOpen={reAssignModal}
                              toggle={closeReAssignModal}
                              className="uapp-modal"
                            >
                              <ModalBody>
                                <p>
                                  Are you sure to re-assign this{" "}
                                  <b>{commissionName}</b> ?
                                </p>
                                <br />
                                <p className="text-danger">
                                  Note : Re-assigning only affects new
                                  applications.
                                </p>
                              </ModalBody>

                              <ModalFooter>
                                <Button
                                  color="danger"
                                  onClick={closeReAssignModal}
                                >
                                  NO
                                </Button>

                                <Button
                                  color="primary"
                                  onClick={() =>
                                    handleReAssignSubmit(commissionId)
                                  }
                                  disabled={buttonStatus}
                                >
                                  {progress ? <ButtonLoader /> : "Yes"}
                                </Button>
                              </ModalFooter>
                            </Modal>
                          </ButtonGroup>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          ) : null}

          {promotionalList.length > 0 ? (
            <PromotionalCommission promotionalList={promotionalList} />
          ) : null}

          <div className="d-flex justify-content-between mt-4 mx-1">
            <Button color="warning" onClick={back} className="mt-3">
              Previous Page
            </Button>
            <Button color="warning" onClick={front} className="mt-3">
              Next Page
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default UpdateAssociateCommission;
