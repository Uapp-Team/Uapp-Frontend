import React, { useEffect, useState } from "react";
import get from "../../../../../helpers/get";

const Note = ({ id }) => {
  const [data, setData] = useState([]);
  // useEffect(() => {
  //   get(`ConsultantDashboard/TargetOverview?id=${id}`).then((res) => {
  //     setData(res);
  //   });
  // }, [id]);

  return (
    <>
      <div className="custom-card-border p-4 mb-3">
        <h5>Notes</h5>
        <div className="overflowY-300px mb-3" id="scroll-note">
          {data?.map((chat, i) => (
            <div className="my-4" key={i}>
              <p className="mb-0" style={{ color: "black", fontWeight: "500" }}>
                {chat?.createdBy}createdBy
              </p>
              <span className="text-gray"> {chat?.createdon}createdon</span>
              {/* <p className="bg-note bg-note-border pt-1 px-3 pb-3 mr-1 mt-2"> */}
              <p className="bg-note bg-note-border p-12px mr-1 mt-2">
                <div
                  className="chat-note-naki"
                  dangerouslySetInnerHTML={{ __html: chat?.note }}
                />
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Note;
