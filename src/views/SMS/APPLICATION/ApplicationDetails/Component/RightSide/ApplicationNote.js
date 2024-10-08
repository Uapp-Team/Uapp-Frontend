import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";
import post from "../../../../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";

const ApplicationNote = ({
  applicationStatusId,
  id,
  notes,
  success,
  setSuccess,
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const { addToast } = useToasts();
  const [noteString, setNoteString] = useState("");
  const [noteError, setNoteError] = useState(false);

  const handleStringData = (e) => {
    setNoteString(e.target.value);
    setNoteError(false);
  };

  const submitNotes = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    if (noteString === "") {
      setNoteError(true);
    } else {
      post(`ApplicationNote/Create`, subData).then((res) => {
        if (res?.status === 200 && res?.data?.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          setNoteString("");
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  useEffect(() => {
    if (notes.length > 1) {
      const container = document.querySelector("#scroll-note");
      container.scrollTop = container.scrollHeight;
    }
  }, [notes]);

  return (
    <>
      <div className="custom-card-border p-4 mb-3">
        <h5>Note</h5>
        <div className="chat" id="scroll-note">
          {notes?.map((chat, i) => (
            <div className="my-4" key={i}>
              <p className="mb-0"> {chat?.createdBy}</p>
              <span className="text-gray"> {chat?.createdon}</span>
              <p className="bg-note border-left pt-1 px-3 pb-3 mr-1">
                {" "}
                {chat?.note}
              </p>
            </div>
          ))}
        </div>

        <div>
          {applicationStatusId !== 13 && (
            <form onSubmit={submitNotes}>
              <hr />

              <Input
                type="hidden"
                name="applicationId"
                id="applicationId"
                value={id}
              />

              <Input
                type="textarea"
                name="note"
                id="note"
                placeholder="Write note..."
                value={noteString}
                onChange={handleStringData}
                // onChange={(e) => setNoteString(e.target.value)}

                className="border-0"
              />
              {noteError ? (
                <span className="text-danger">Note is required</span>
              ) : null}
              <div className="mt-3">
                {permissions?.includes(permissionList.Add_ApplicationNote) ? (
                  <SaveButton />
                ) : null}
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default ApplicationNote;
