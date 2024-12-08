import React from "react";
import Origine from "../Form/Origine";
import { dateFormate } from "../../../../components/date/calenderFormate";

const DateRangeAns = ({ defaultData }) => {
  return (
    <div className="px-4 mt-3 mb-4">
      <p className="card-heading">{defaultData?.title}</p>
      {defaultData?.isSameForAll === true ? (
        <>
          {defaultData?.answers === null ? (
            <p className="mt-2" style={{ color: "#626767" }}>
              No answer for this university
            </p>
          ) : (
            <>
              <p
                className="mt-2 mb-3"
                style={{ color: "#626767", fontSize: "16px" }}
              >
                <span className="mr-3 date-for-users-ans-faq">
                  {" "}
                  {defaultData?.answers[0]}
                </span>
                to
                <span className="ml-3 date-for-users-ans-faq">
                  {defaultData?.answers[1]}
                </span>
              </p>
              {/* <h5 className="className=" text-gray>
                      {dateFormate(defaultData?.createdOn)}
                    </h5> */}
            </>
          )}
        </>
      ) : (
        <>
          {defaultData?.answerList?.map((item, i) => (
            <>
              <div key={i}>
                <Origine typeId={item?.origineType} />
                {item?.answers === null ? (
                  <p className="mt-2" style={{ color: "#626767" }}>
                    There is no answer
                  </p>
                ) : (
                  <>
                    <p
                      className="mt-2 mb-3"
                      style={{ color: "#626767", fontSize: "16px" }}
                    >
                      <span className="mr-3 date-for-users-ans-faq">
                        {" "}
                        {item?.answers[0]}
                      </span>
                      to
                      <span className="ml-3 date-for-users-ans-faq">
                        {item?.answers[1]}
                      </span>
                    </p>
                    {/* <h5 className="className=" text-gray>
                      {dateFormate(defaultData?.createdOn)}
                    </h5> */}
                  </>
                )}
              </div>
            </>
          ))}
        </>
      )}
    </div>
  );
};

export default DateRangeAns;
