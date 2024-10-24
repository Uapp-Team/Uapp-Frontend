import React from "react";
import Origine from "../Form/Origine";

const SingleChoiceAns = ({ defaultData }) => {
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
              {defaultData?.answers?.map((answer, i) => (
                <div key={i} className="mt-2 multiple-single-choice">
                  {answer}
                </div>
              ))}
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
                    No answer for this university
                  </p>
                ) : (
                  <>
                    {item?.answers?.map((answer, i) => (
                      <div key={i} className="mt-2 multiple-single-choice">
                        {answer}
                      </div>
                    ))}
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

export default SingleChoiceAns;
