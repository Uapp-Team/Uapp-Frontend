import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import {
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Button,
  Table,
  Row,
  Col,
} from "reactstrap";
import get from "../../../../../helpers/get";
import post from "../../../../../helpers/post";
import ButtonForFunction from "../../../Components/ButtonForFunction";
import ConsultantNavigation from "../NavigationAndRegistration/ConsultantNavigation";
import put from "../../../../../helpers/put";
import { userTypes } from "../../../../../constants/userTypeConstant";
import remove from "../../../../../helpers/remove";
import PromotionalCommission from "../../../Consultant/PromotionalCommission";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import AssignCommissionForm from "./Component/AssignCommissionForm";
import CurrentCommissionGroup from "./Component/CurrentCommissionGroup";
import ConsultantCommissionGroupHistory from "./Component/ConsultantCommissionGroupHistory";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";
import PreviousButton from "../../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../../components/buttons/SaveButton";
import icon_info from "../../../../../assets/img/icons/Frame.png";
import DefaultDropdown from "../../../../../components/Dropdown/DefaultDropdown";

const ConsultantCommission = () => {
  const history = useHistory();
  const activetab = "8";
  const [commissionGroupList, setCommissionGrouplist] = useState([]);
  const [commissionDD, setCommissionDD] = useState([]);
  const [commissionLabel, setCommissionLabel] = useState("Select Commission");
  const [commissionValue, setCommissionValue] = useState(0);
  const [commissionError, setCommissionError] = useState(false);
  const [priceRangeList, setPriceRangeList] = useState([]);
  const [bonusList, setBonusList] = useState(null);
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
  const [navVisibility, setNavVisibility] = useState({});
  const userTypeId = localStorage.getItem("userType");
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [isHide, setIsHide] = useState(true);
  const [logList, setLogList] = useState([]);
  const userType = localStorage.getItem("userType");

  const [designationValue, setDesignationValue] = useState(0);
  const [designationLable, setDesignationLable] =
    useState("Select Designation");
  const [designationError, setDesignationError] = useState(false);

  useEffect(() => {
    get(`CommissionGroupDD/ByConsultant?id=${consultantRegisterId}`).then(
      (res) => {
        setCommissionDD(res);
      }
    );

    get(`ConsultantDesignation/Overview/${consultantRegisterId}`).then(
      (res) => {
        setBonusList(res);
      }
    );

    get(`ConsultantDesignation/History/${consultantRegisterId}`).then((res) => {
      setLogList(res);
    });

    get(`ConsultantNavBar/Get/${consultantRegisterId}`).then((res) => {
      console.log("consNav", res);
      setNavVisibility(res);
    });

    get(`ConsultantCommissionGroup/Index/${consultantRegisterId}`).then(
      (res) => {
        setCommissionGrouplist(res);
      }
    );

    get(`GroupPriceRange/ByConsultant/${consultantRegisterId}`).then((res) => {
      setPriceRangeList(res);
    });

    get("PromotionalCommission/Index").then((res) => {
      console.log(res, "asif");
      setPromotionalList(res);
    });
  }, [consultantRegisterId, success]);

  const commissionMenu = commissionDD?.map((commission) => ({
    label: commission?.name,
    value: commission?.id,
  }));

  const selectCommission = (label, value) => {
    setCommissionLabel(label);
    setCommissionValue(value);
    setCommissionError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subdata = new FormData(e.target);
    subdata.append(`isApplicable`, checked);

    // for (var i of subdata) {
    // }

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
    remove(`ConsultantCommissionGroup/Delete/${id}`).then((action) => {
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
    });
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

  const submitDesignation = (e) => {
    e.preventDefault();
    if (designationValue === 0) {
      setDesignationError(true);
    } else {
      setProgress(true);
      setButtonStatus(true);
      put(
        `ConsultantDesignation/Assign/${consultantRegisterId}/${designationValue}`
      ).then((res) => {
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
    }
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

  const goBackward = () => {
    if (navVisibility?.recruitment) {
      history.push(`/consultantRecruitmentInformation/${consultantRegisterId}`);
    } else {
      history.push(`/consultantBankInformation/${consultantRegisterId}`);
    }
  };
  const goForward = () => {
    history.push(`/consultantTermsInformation/${consultantRegisterId}`);
  };
  console.log(bonusList);
  return (
    <div>
      <BreadCrumb
        title="Consultant Commission Information"
        backTo={userType === userTypes?.Consultant ? null : "Consultant"}
        path={`/consultantList`}
      />

      <ConsultantNavigation
        consultantId={consultantRegisterId}
        activetab={activetab}
        navVisibility={navVisibility}
        success={success}
      />
      <Card>
        <CardBody>
          {/* nav tabs start */}

          {/* nav tabs end */}
          <>
            <p className="section-title"> Designation and Commission </p>
            {bonusList ? (
              <>
                <div
                  className="mt-1 mb-4 d-flex justify-content-between cardborder"
                  style={{ backgroundColor: "#DFEEEE" }}
                >
                  <div className="Designation">
                    <img style={{ height: "100%" }} src={icon_info} alt="" />{" "}
                    <span>{bonusList?.designationName}</span>
                  </div>
                  <div className="pl-3 mt-2">
                    <span
                      className="text-underline pointer"
                      onClick={() => setIsHide(!isHide)}
                    >
                      {isHide ? <> Hide Log</> : <>Show Log</>}
                    </span>
                  </div>
                </div>
                <div className="">
                  {" "}
                  {bonusList?.designationItems?.map((range, i) => (
                    <span key={i}>
                      {range?.isActive ? <b>{range?.name}</b> : range?.name}{" "}
                      {bonusList?.designationItems.length === i + 1 ? null : (
                        <>
                          <span>
                            {" "}
                            <i class="fas fa-chevron-right"></i>
                          </span>
                        </>
                      )}
                    </span>
                  ))}
                </div>

                <div className="my-3">
                  {isHide ? (
                    <>
                      <Table>
                        <thead className="tablehead">
                          <tr>
                            <th>SL/No</th>
                            <th>Designation</th>
                            <th>Intake</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* {logList.map((logs, i) => (
                        <li key={i}>
                          {logs?.IntakeRanges?.map((element, e) => (
                            <tr key={element?.designationId}>
                              <th scope="row">{1 + i}</th>
                              <td>{element?.title}</td>
                            </tr>
                          ))}
                        </li>
                      ))} */}

                          {logList?.map((logs, i) => (
                            <tr key={logs.designationId}>
                              <th scope="row">{1 + i}</th>
                              <td>{logs?.title}</td>
                              <td>
                                {logs?.intakeRanges?.map((intake, i) => (
                                  <> {intake?.name}</>
                                ))}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </>
                  ) : null}
                </div>

                <div className=" mt-2">
                  <Table>
                    <thead className="tablehead">
                      <tr>
                        <th>SL/No</th>
                        <th>Bonus target</th>
                        <th>Bonuses </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">{1}</th>
                        <td>
                          Minimum student required :{" "}
                          {bonusList?.personalStudentTarget}
                        </td>
                        <td>Level 1 Bonus : {bonusList?.teamBonus}</td>
                      </tr>
                      <tr>
                        <th scope="row">{2}</th>
                        <td>
                          Minimum consultant required :{" "}
                          {bonusList?.consultantTarget}
                        </td>
                        <td>Personal Bonus: {bonusList?.personalBonus}</td>
                      </tr>
                      <tr>
                        <th scope="row">{3}</th>
                        <td>
                          Minimum student from team :
                          {bonusList?.studentFormTeam}
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </>
            ) : (
              <>
                <form onSubmit={submitDesignation} className="mt-3">
                  <Row>
                    <Col md={6}>
                      <div className="mt-1 mb-4 d-flex justify-content-between cardborder">
                        No Designation is assigned to this consultant
                      </div>

                      <FormGroup>
                        <span>Assign Designation</span>

                        <DefaultDropdown
                          label={designationLable}
                          setLabel={setDesignationLable}
                          value={designationValue}
                          setValue={setDesignationValue}
                          url={`designationDD/ByConsultant?id=${consultantRegisterId}`}
                          name="designationValue"
                          error={designationError}
                          setError={setDesignationError}
                          errorText="Designation is required"
                          action={() => {}}
                        />
                      </FormGroup>

                      <FormGroup>
                        <div className="text-right">
                          <SaveButton
                            text="Assign"
                            buttonStatus={buttonStatus}
                            progress={progress}
                          />
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                </form>
              </>
            )}
          </>

          <>
            {" "}
            {showForm ? (
              <>
                {priceRangeList?.length > 0 ? (
                  <CurrentCommissionGroup
                    priceRangeList={priceRangeList}
                    permissions={permissions}
                    permissionList={permissionList}
                    setShowForm={setShowForm}
                    showForm={showForm}
                  ></CurrentCommissionGroup>
                ) : null}
              </>
            ) : null}
          </>

          {permissions?.includes(permissionList.Assign_Commission_Group) ? (
            <>
              {" "}
              {priceRangeList?.length < 1 || !showForm ? (
                <AssignCommissionForm
                  handleSubmit={handleSubmit}
                  consultantRegisterId={consultantRegisterId}
                  commissionMenu={commissionMenu}
                  commissionValue={commissionValue}
                  commissionLabel={commissionLabel}
                  selectCommission={selectCommission}
                  commissionError={commissionError}
                  checked={checked}
                  setChecked={setChecked}
                  priceRangeList={priceRangeList}
                  setShowForm={setShowForm}
                  setCommissionLabel={setCommissionLabel}
                  setCommissionValue={setCommissionValue}
                  showForm={showForm}
                  progress={progress}
                  buttonStatus={buttonStatus}
                ></AssignCommissionForm>
              ) : null}{" "}
            </>
          ) : null}

          {commissionGroupList?.length > 0 ? (
            <ConsultantCommissionGroupHistory
              userTypeId={userTypeId}
              userTypes={userTypes}
              commissionGroupList={commissionGroupList}
              handleDate={handleDate}
              handleReAssign={handleReAssign}
              toggleDanger={toggleDanger}
              deleteModal={deleteModal}
              closeDeleteModal={closeDeleteModal}
              delCommissionName={delCommissionName}
              delCommissionId={delCommissionId}
              buttonStatus={buttonStatus}
              handleDeleteCommission={handleDeleteCommission}
              reAssignModal={reAssignModal}
              closeReAssignModal={closeReAssignModal}
              commissionName={commissionName}
              handleReAssignSubmit={handleReAssignSubmit}
              commissionId={commissionId}
              progress={progress}
            ></ConsultantCommissionGroupHistory>
          ) : null}

          {promotionalList.length > 0 ? (
            <PromotionalCommission promotionalList={promotionalList} />
          ) : null}

          <FormGroup className="d-flex justify-content-between mt-4">
            <PreviousButton action={goBackward} />
            <SaveButton
              text="Next"
              action={goForward}
              buttonStatus={buttonStatus}
            />
          </FormGroup>
        </CardBody>
      </Card>
    </div>
  );
};

export default ConsultantCommission;
