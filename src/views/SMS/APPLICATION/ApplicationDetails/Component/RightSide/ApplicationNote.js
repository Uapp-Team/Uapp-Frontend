import React, { useEffect, useRef, useState } from "react";
import { Form, Input } from "reactstrap";
import post from "../../../../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
  const [noteCheck, setNoteCheck] = useState("");
  const [noteError, setNoteError] = useState(false);
  const quillRef = useRef();

  useEffect(() => {
    if (noteString) {
      const quill = quillRef.current.getEditor();
      const currentContent = quill.getText().trim();
      setNoteCheck(currentContent);
      setNoteError(false);
    }
  }, [noteString]);

  const submitNotes = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);
    subData.append("note", noteString);

    if (!noteCheck) {
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
          setNoteCheck("");
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
        <h5>Notes</h5>
        <div className="overflowY-300px mb-3" id="scroll-note">
          {notes?.map((chat, i) => (
            <div className="my-4" key={i}>
              <p className="mb-0" style={{ color: "black", fontWeight: "500" }}>
                {chat?.createdBy}
              </p>
              <span className="text-gray"> {chat?.createdon}</span>
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

        {permissions?.includes(permissionList.Add_ApplicationNote) ? (
          <div>
            {applicationStatusId !== 13 && (
              <Form onSubmit={submitNotes}>
                <Input
                  type="hidden"
                  name="applicationId"
                  id="applicationId"
                  value={id}
                />

                {/* <Input
                  type="textarea"
                  name="note"
                  id="note"
                  placeholder="Write note..."
                  value={noteString}
                  onChange={handleStringData}
                  className="border-0"
                /> */}

                <div className="notetext">
                  <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={noteString}
                    className="editor-input"
                    placeholder="Write note..."
                    onChange={setNoteString}
                  />
                </div>

                {noteError && (
                  <span className="text-danger">Note is required</span>
                )}
                <div className="mt-3">
                  <SaveButton />
                </div>
              </Form>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ApplicationNote;
