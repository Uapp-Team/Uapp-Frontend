import React from "react";
import Origine from "../Form/Origine";
import DOMPurify from "dompurify";

const TextAns = ({ defaultData }) => {
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <div className="px-4 mt-3 mb-4">
      <span className="card-heading">{defaultData?.title}</span>
      {defaultData?.isSameForAll === true ? (
        <>
          {defaultData?.answers === null ? (
            <p className="mt-2" style={{ color: "#626767" }}>
              No answer for this university
            </p>
          ) : (
            <p className="mt-2" style={{ color: "#626767" }}>
              <div
                dangerouslySetInnerHTML={createMarkup(
                  defaultData?.answers && defaultData?.answers[0]
                )}
              ></div>
            </p>
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
                  <p className="mt-2" style={{ color: "#626767" }}>
                    <div
                      dangerouslySetInnerHTML={createMarkup(
                        item?.answers && item?.answers[0]
                      )}
                    ></div>
                  </p>
                )}
              </div>
            </>
          ))}
        </>
      )}
    </div>
  );
};

export default TextAns;
