import React, { useEffect, useState } from "react";
import get from "../../../../../helpers/get";
import icon_info from "../../../../../assets/img/icons/Frame.png";
import { Table } from "reactstrap";

const ConsultantDesignation = ({ id }) => {
  const [bonusList, setBonusList] = useState(null);
  const [isHide, setIsHide] = useState(true);
  const [logList, setLogList] = useState([]);

  useEffect(() => {
    get(`ConsultantDesignation/Overview/${id}`).then((res) => {
      setBonusList(res);
    });
    get(`ConsultantDesignation/History/${id}`).then((res) => {
      setLogList(res);
    });
  }, [id]);

  return (
    <>
      {bonusList ? (
        <>
          <div className="mt-1 mb-4 d-flex justify-content-between cardborder bg-white">
            <div className="Designation">
              <img style={{ height: "100%" }} src={icon_info} alt="" />{" "}
              <span>{bonusList?.designationName}</span>
            </div>
            {/* <div className="pl-3 mt-2">
              <span
                className="text-underline pointer"
                onClick={() => setIsHide(!isHide)}
              >
                {isHide ? <> Hide Log</> : <>Show Log</>}
              </span>
            </div> */}
          </div>
          <div className="mb-2">
            {" "}
            {bonusList?.designationItems?.map((range, i) => (
              <span key={i}>
                {range?.isActive ? (
                  <b style={{ color: "#045d5e" }}>{range?.name}</b>
                ) : (
                  range?.name
                )}
                {bonusList?.designationItems.length === i + 1 ? null : (
                  <>
                    <span>
                      <i class="fas fa-chevron-right mx-1"></i>
                    </span>
                  </>
                )}
              </span>
            ))}
          </div>
        </>
      ) : null}
    </>
  );
};

export default ConsultantDesignation;
