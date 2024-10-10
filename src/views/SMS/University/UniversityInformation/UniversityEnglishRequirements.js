import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormGroup, Col, Label } from "reactstrap";
import get from "../../../../helpers/get";
import { useToasts } from "react-toast-notifications";
import post from "../../../../helpers/post";
import ButtonLoader from "../../Components/ButtonLoader";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Loader from "../../Search/Loader/Loader";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import SaveButton from "../../../../components/buttons/SaveButton";

const UniversityEnglishRequirements = () => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const { univerId } = useParams();
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [engWaiver, setEngWaiver] = useState(false);
  const [moi, setMoi] = useState(false);
  const { addToast } = useToasts();
  const [progress, setProgress] = useState(false);
  const [requirementId, setRequirementId] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get(`UniversityEnglishRequirement/GetByUniversityId/${univerId}`).then(
      (res) => {
        console.log(res, "requirements");
        setLoading(false);
        setValue(
          res?.requirementInformation === "undefined"
            ? ""
            : res?.requirementInformation
        );
        setValue1(
          res?.englishWaiverDetails === "undefined"
            ? ""
            : res?.englishWaiverDetails
        );
        setValue2(res?.moiDetails === "undefined" ? "" : res?.moiDetails);

        setEngWaiver(
          res != null && res?.englishWaiver === true
            ? true
            : res != null && res?.englishWaiver === null
            ? false
            : false
        );

        setMoi(
          res != null && res?.moiAccepted === true
            ? true
            : res != null && res?.moiAccepted === null
            ? false
            : false
        );

        setRequirementId(res == null ? 0 : res?.id);
      }
    );
  }, [univerId]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { list: "ordered" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
    ],
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    subData.append("requirementInformation", value);
    subData.append("englishWaiver", engWaiver);
    subData.append("englishWaiverDetails", value1);
    subData.append("mOIAccepted", moi);
    subData.append("mOIDetails", value2);
    subData.append("universityId", univerId);
    subData.append("id", requirementId);

    setProgress(true);
    post(`UniversityEnglishRequirement/Create`, subData).then((res) => {
      setProgress(false);
      setSuccess(!success);
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <p className="section-title"> English requirements</p>
            <FormGroup row className="has-icon-left position-relative">
              <Col md="8" style={{ height: "370px" }}>
                <ReactQuill
                  theme="snow"
                  value={value}
                  modules={modules}
                  className="editor-input"
                  onChange={setValue}
                />
              </Col>
            </FormGroup>
            <FormGroup row className="has-icon-left position-relative">
              <Col>
                <div
                  className="d-flex m-1 align-items-center"
                  style={{ fontWeight: "500" }}
                >
                  <p className="commission-text pr-3 mt-2">
                    English waiver available
                  </p>
                  <FormGroup check inline>
                    <input
                      className="form-check-input"
                      type="radio"
                      id="englishWaiver"
                      name="englishWaiver"
                      value={true}
                      onClick={() => setEngWaiver(!engWaiver)}
                      checked={engWaiver === true}
                    />
                    <Label
                      className="form-check-label"
                      check
                      htmlFor="englishWaiver"
                    >
                      Yes
                    </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <input
                      className="form-check-input"
                      type="radio"
                      id="englishWaiver"
                      name="englishWaiver"
                      value={false}
                      onClick={() => setEngWaiver(!engWaiver)}
                      checked={engWaiver === false}
                    />
                    <Label
                      className="form-check-label"
                      check
                      htmlFor="englishWaiver"
                    >
                      No
                    </Label>
                  </FormGroup>
                </div>
              </Col>
            </FormGroup>
            {engWaiver === true && (
              <FormGroup row className="has-icon-left position-relative">
                <Col md="8" style={{ height: "370px" }}>
                  <ReactQuill
                    theme="snow"
                    value={value1}
                    modules={modules}
                    className="editor-input"
                    onChange={setValue1}
                  />
                </Col>
              </FormGroup>
            )}
            <FormGroup row className="has-icon-left position-relative">
              <Col>
                <div
                  className="d-flex m-1 align-items-center"
                  style={{ fontWeight: "500" }}
                >
                  <p className="commission-text pr-3 mt-2">
                    MOI ( Medium Of Instruction) accepted
                  </p>
                  <input
                    type="radio"
                    value="Yes"
                    onClick={() => setMoi(true)}
                    checked={moi === true && true}
                  />
                  <label
                    className="mt-2 px-2"
                    style={{ fontWeight: 500, fontSize: "14px" }}
                  >
                    Yes
                  </label>
                  <input
                    type="radio"
                    value="No"
                    onClick={() => setMoi(false)}
                    checked={moi === false && true}
                  />
                  <label
                    className="mt-2 px-2"
                    style={{ fontWeight: 500, fontSize: "14px" }}
                  >
                    No
                  </label>
                </div>
              </Col>
            </FormGroup>
            {moi === true && (
              <FormGroup row className="has-icon-left position-relative">
                <Col md="8" style={{ height: "370px" }}>
                  <ReactQuill
                    theme="snow"
                    value={value2}
                    modules={modules}
                    className="editor-input"
                    onChange={setValue2}
                  />
                </Col>
              </FormGroup>
            )}

            <FormGroup row>
              <Col md="8" className="text-right">
                {permissions?.includes(permissionList.Edit_University) && (
                  <SaveButton progress={progress} />
                )}
              </Col>
            </FormGroup>
          </form>
        </div>
      )}
    </div>
  );
};

export default UniversityEnglishRequirements;
