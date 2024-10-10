import React, { useEffect, useState } from "react";
// import Loading from "../../../components/ui/Loading";
// import ErrorMessage from "../../../components/ui/ErrorMessage";
// import { Get } from "../../../api/method";
import NoteForm from "./NoteForm";
// import CardHeading from "../../../components/ui/CardHeading";
import { PiNote } from "react-icons/pi";
import Lget from "../../../../../helpers/Lget";
import CardHeading from "../../../../../components/ui/CardHeading";

const Note = ({ id }) => {
  // const { data, error, isLoading, isError, refetch } = Get(
  //   "key",
  //   `/LeadNote?id=${id}`
  // );
  const [data, setData] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    Lget(`LeadNote?id=${id}`).then((res) => {
      setData(res);
    });
  }, [id, success]);

  // if (isLoading) return <Loading />;
  // if (isError) return <ErrorMessage message={error.message} />;

  const pageData = data?.data;
  return (
    <>
      <div className="custom-card-border p-4 mb-3">
        <CardHeading Icon={PiNote} text="Note" />
        <div className="mh-250px mb-1">
          {pageData?.map((item, i) => (
            <p key={i} className="border-left p-2">
              {item.noteContent}
            </p>
          ))}
        </div>

        <NoteForm id={id} refetch={() => setSuccess(!success)} />
      </div>
    </>
  );
};

export default Note;
