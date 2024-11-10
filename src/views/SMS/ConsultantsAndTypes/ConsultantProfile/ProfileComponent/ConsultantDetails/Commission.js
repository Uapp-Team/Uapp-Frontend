import React, { useEffect, useRef, useState } from "react";
import { Col, Modal, ModalBody, Row, Table } from "reactstrap";
import icon_info from "../../../../../../assets/img/icons/Frame.png";
import { useParams } from "react-router-dom";
import get from "../../../../../../helpers/get";
import PromotionalCommission from "../../../../Consultant/PromotionalCommission";
import { userTypes } from "../../../../../../constants/userTypeConstant";
import put from "../../../../../../helpers/put";
import { useToasts } from "react-toast-notifications";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";
import ConfirmModal from "../../../../../../components/modal/ConfirmModal";
import CancelButton from "../../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../../components/buttons/SaveButton";

const Commission = ({ id }) => {
  const { slug } = useParams();
  const { addToast } = useToasts();
  const divRef = useRef(null);
  const [promote, setPromote] = useState(true);
  const [success, setSuccess] = useState(false);
  const [bonusList, setBonusList] = useState(null);
  const [details, setDetails] = useState(null);
  const [isHide, setIsHide] = useState(true);
  const [logList, setLogList] = useState([]);
  const [priceRangeList, setPriceRangeList] = useState([]);
  const [promotionalList, setPromotionalList] = useState([]);
  const [promoteModal, setPromoteModal] = useState(false);
  const [bonusModal, setBonusModal] = useState(false);
  const [promoteData, setPromoteData] = useState(false);
  const [demoteModal, setDemoteModal] = useState(false);
  const [currPromoteData, setCurrPromoteData] = useState({});
  const userType = localStorage.getItem("userType");
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    if (promote && slug === "promote") {
      setTimeout(function () {
        var link = document.createElement("a");
        link.href = `#promote`;
        link.click();
      }, 200);
      setPromote(false);
    }
  }, [promote, slug]);

  useEffect(() => {
    get(`ConsultantDesignation/Overview/${id}`).then((res) => {
      setBonusList(res);
    });

    get(`ConsultantDesignation/History/${id}`).then((res) => {
      setLogList(res);
    });

    get(`GroupPriceRange/ByConsultant/${id}`).then((res) => {
      setPriceRangeList(res);
    });
    get(`PromotionalCommission/ForConsultant/${id}`).then((res) => {
      setPromotionalList(res);
    });
  }, [id]);

  useEffect(() => {
    get(`ConsultantDesignation/details/${id}`).then((res) => {
      console.log(res, "check designation");
      setDetails(res);
    });
  }, [id, success]);

  const handlePromote = () => {
    get(
      `ConsultantDesignation/CheckPromote/${details?.designationId}/${details.consultantId}`
    ).then((res) => {
      setPromoteData(res);
    });
    setCurrPromoteData(details);
    setPromoteModal(true);
  };

  const handlePromoteData = () => {
    put(
      `ConsultantDesignation/Promote/${details?.consultantId}/${details?.intakeId}`
    ).then((res) => {
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setSuccess(!success);
        setPromoteModal(false);
      }
    });
  };

  const handleDemoteData = () => {
    put(
      `ConsultantDesignation/demote/${details?.consultantId}/${details?.intakeId}`
    ).then((res) => {
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setSuccess(!success);
        setPromoteModal(false);
      }
    });
  };

  const handleBonusData = () => {
    put(
      `ConsultantDesignation/PayBonus/${details?.consultantId}/${details?.intakeId}`
    ).then((res) => {
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setSuccess(!success);
        setBonusModal(false);
      }
    });
  };

  return (
    <>
      <p className="section-title mb-4"> Designation and Commission </p>

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
              {isHide ? "Hide Log" : "Show Log"}
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
                    {/* <th>SL/No</th> */}
                    <th>Designation</th>
                    <th>Intakes</th>
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
                      {/* <th scope="row">{1 + i}</th> */}
                      <td width="60%">{logs?.title}</td>
                      <td width="40%">
                        {logs?.intakeRanges?.map((intake, i) => (
                          <>
                            {intake?.name}
                            {logs?.intakeRanges.length === i + 1 ? null : ", "}
                          </>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : null}
        </div>

        <div id="promote" className="mt-2">
          <p className="section-title">Bonus Progress : </p>
          <Table>
            <thead className="tablehead">
              <tr>
                <th></th>

                <th>Process </th>
                <th>Remaining</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Direct student </td>

                <td>{details?.bonusProgressDirectStudent}</td>
                <td>{details?.studentRemainingForBonus}</td>
              </tr>
              <tr>
                <td>{details?.bonusDesignation}</td>

                <td>{details?.bonusProgressConsultant}</td>
                <td>{details?.consultantRemainingForBonus}</td>
              </tr>
              <tr>
                <td>Student from team </td>

                <td>{details?.bonusProgressStudentFromTeam}</td>
                <td>{details?.teamRemainingForBonus}</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div id="promote" className="mt-2">
          <p className="section-title">Promotional Progress : </p>
          <Table>
            <thead className="tablehead">
              <tr>
                <th></th>

                <th>Process </th>
                <th>Remaining</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Direct student </td>

                <td>{details?.promotionProgressDirectStudent}</td>
                <td>{details?.studentRemainingForPromotion}</td>
              </tr>
              <tr>
                <td>{details?.promotionConsultantDesignation}</td>

                <td>{details?.promotionProgressConsultant}</td>
                <td>{details?.consultantRemainingForPromotion}</td>
              </tr>
              <tr>
                <td>Student from team </td>

                <td>{details?.promotionProgressStudentFromTeam}</td>
                <td>{details?.teamRemainingForPromotion}</td>
              </tr>
            </tbody>
          </Table>
        </div>

        <div ref={divRef}>
          {(userType === userTypes?.SystemAdmin ||
            userType === userTypes?.Admin ||
            userType === userTypes?.BranchAdmin) && (
            <Row>
              <Col>
                <div className="p-3">
                  <b>Bonus</b>
                  <li className="designation-commission-list">
                    <span>Team Bonus</span>
                    <b>£ {details?.teamBonus}</b>
                  </li>
                  <li className="designation-commission-list">
                    <span>Personal Bonus</span>
                    <b>£ {details?.personalBonus}</b>
                  </li>
                  <hr />
                  <li className="designation-commission-list">
                    <span>Total</span>
                    <b>£ {details?.teamBonus + details?.personalBonus}</b>{" "}
                  </li>
                </div>
              </Col>
              <Col>
                <div className="p-3">
                  <p>
                    <b>Action</b>
                  </p>

                  {details?.isDemote ? (
                    <>
                      <p
                        className="text-info pointer"
                        onClick={() => setDemoteModal(true)}
                      >
                        Demote
                      </p>
                    </>
                  ) : (
                    <>
                      {details?.isPromotable === true ? (
                        <>
                          {permissions?.includes(
                            permissionList.Change_Consultant_designation
                          ) && (
                            <p
                              className="text-info pointer"
                              onClick={() => handlePromote()}
                            >
                              Promote
                            </p>
                          )}
                        </>
                      ) : (
                        <p>Not Eligible for Promote</p>
                      )}
                      {details?.isBonusPaid === false ? (
                        <>
                          {permissions?.includes(
                            permissionList.Pay_Designation_Bonus
                          ) && (
                            <p
                              className="text-info pointer"
                              onClick={() => setBonusModal(true)}
                            >
                              Pay Bonus
                            </p>
                          )}
                        </>
                      ) : (
                        <p>Not Eligible for Pay Bonus</p>
                      )}
                    </>
                  )}
                </div>
              </Col>
            </Row>
          )}
        </div>

        <div className="mt-4 mx-1">
          {priceRangeList.length > 0 ? (
            <>
              {" "}
              <div>
                <p className="section-title">
                  Current Commission Group :{" "}
                  {priceRangeList[0]?.commissionGroup?.name}
                </p>

                <div className=" mt-2">
                  <Table>
                    <thead className="tablehead">
                      <tr>
                        <th>Price Range</th>
                        <th>Range From</th>
                        <th>Range To</th>
                        <th>Commission Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {priceRangeList?.map((range, i) => (
                        <tr key={range.id}>
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
            </>
          ) : (
            <div className="text-center">
              <h3>No commission group is assigned</h3>
            </div>
          )}
        </div>

        <div className="mt-4">
          {promotionalList.length > 0 ? (
            <PromotionalCommission promotionalList={promotionalList} />
          ) : null}
        </div>
      </>

      <ConfirmModal
        text="Are You Sure to Pay Bonus? This Process Cannot be Reversed!"
        isOpen={bonusModal}
        toggle={() => setBonusModal(!bonusModal)}
        cancel={() => setBonusModal(false)}
        confirm={handleBonusData}
      />

      <ConfirmModal
        text={`Are you sure to demote? `}
        isOpen={demoteModal}
        toggle={() => setDemoteModal(!demoteModal)}
        cancel={() => setDemoteModal(false)}
        confirm={handleDemoteData}
      />

      <Modal
        isOpen={promoteModal}
        toggle={() => setPromoteModal(!promoteModal)}
        className="uapp-modal"
      >
        <ModalBody style={{ padding: "30px" }}>
          <div>
            <p>
              <b>
                {!promoteData?.alreadyHighest
                  ? `Promote to ${promoteData?.promoteTo}? `
                  : `${currPromoteData?.consultantName} is already in the highest designation`}
              </b>
            </p>

            {!promoteData?.alreadyHighest && (
              <p>
                Are you promote <b> {currPromoteData?.consultantName} </b>
                form <b>{currPromoteData?.designation}</b> to{" "}
                <b>{promoteData?.promoteTo}</b> ?
              </p>
            )}
            {!promoteData?.alreadyHighest && !currPromoteData?.isBonusPaid && (
              <span className="text-yellow">
                Note: The designation bonus is not paid to the consultant yet.
                If you want to pay bonus then make the transaction first and
                then promote. After promotion, you will not be able to pay
                bonus.
              </span>
            )}
          </div>

          <div className={promoteData?.alreadyHighest && "text-center"}>
            <CancelButton
              text={promoteData?.alreadyHighest ? "Ok" : "No"}
              cancel={() => setPromoteModal(false)}
            />
            {!promoteData?.alreadyHighest && (
              <SaveButton text="Yes" action={handlePromoteData} />
            )}
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Commission;
