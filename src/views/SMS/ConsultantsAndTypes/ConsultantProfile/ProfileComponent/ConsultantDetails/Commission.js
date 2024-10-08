import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import icon_info from "../../../../../../assets/img/icons/Frame.png";
// import icon_info from "../../../../../assets/img/icons/Frame.png";
import get from "../../../../../../helpers/get";
import CurrentCommissionGroup from "../../../ConsultantAllInformation/CommissionInformation/Component/CurrentCommissionGroup";
import PromotionalCommission from "../../../../Consultant/PromotionalCommission";

const Commission = ({ id }) => {
  const [bonusList, setBonusList] = useState(null);
  const [isHide, setIsHide] = useState(true);
  const [logList, setLogList] = useState([]);
  const [priceRangeList, setPriceRangeList] = useState([]);
  const [promotionalList, setPromotionalList] = useState([]);

  useEffect(() => {
    get(`ConsultantDesignation/Overview/${id}`).then((res) => {
      setBonusList(res);
    });

    get(`ConsultantDesignation/History/${id}`).then((res) => {
      setLogList(res);
      console.log("loglist", res);
    });

    get(`GroupPriceRange/ByConsultant/${id}`).then((res) => {
      setPriceRangeList(res);
    });
    get("PromotionalCommission/Index").then((res) => {
      setPromotionalList(res);
    });
  }, []);

  return (
    <div>
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
                  Minimum student required : {bonusList?.personalStudentTarget}
                </td>
                <td>Level 1 Bonus : {bonusList?.teamBonus}</td>
              </tr>
              <tr>
                <th scope="row">{2}</th>
                <td>
                  Minimum consultant required : {bonusList?.consultantTarget}
                </td>
                <td>Personal Bonus: {bonusList?.personalBonus}</td>
              </tr>
              <tr>
                <th scope="row">{3}</th>
                <td>Minimum student from team :{bonusList?.studentFormTeam}</td>
                <td></td>
              </tr>
            </tbody>
          </Table>
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
                        <th>SL/No</th>
                        <th>Price Range</th>
                        <th>Range From</th>
                        <th>Range To</th>
                        <th>Commission Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {priceRangeList?.map((range, i) => (
                        <tr key={range.id}>
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
    </div>
  );
};

export default Commission;
