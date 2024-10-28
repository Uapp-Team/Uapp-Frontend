import React, { useEffect, useState } from "react";
import get from "../../../../../helpers/get";
import { dateFormate } from "../../../../../components/date/calenderFormate";

const Note = ({ id }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    get(`Consultant/get-notes/${id}`).then((res) => {
      console.log(res);
      setData(res);
    });
  }, [id]);

  return (
    <>
      <div className="custom-card-border p-4 mb-3">
        <h5>Notes</h5>
        <div className="overflowY-300px mb-3" id="scroll-note">
          {data?.map((chat, i) => (
            <div className="my-4" key={i}>
              <span className="text-gray">
                {dateFormate(chat?.createdDate)}
              </span>

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
